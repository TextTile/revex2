import elasticsearch from "elasticsearch";
import _ from "lodash";
import Query from "./Query";

import { flat, hashCode } from "../utils";
import moment from "moment";

function flttenProperty(key, object) {
    if (object.properties) {
        let result = _.keys(object.properties)
            .map(childKey => {
                return flttenProperty(childKey, object.properties[childKey]);
            })
            .reduce((prev, current) => ({ ...prev, ...current }), {});
        result = _.mapKeys(result, (value, childKey) => (key ? `${key}.${childKey}` : childKey));
        return result;
    } else {
        return { [key]: object };
    }
}

function flattenMapping(mapping) {
    mapping = flttenProperty("", mapping);
    return mapping;
}

function getType(info) {
    switch (info.type) {
        case "date":
            return "Date";
        case "keywrod":
            return "Categorical";
        case "string":
            if (info.index === "not_analyzed") return "Categorical";
            return "Text";
        case "text":
            return "Text";
        case "double":
            return "Continuous";
        case "long":
            return "Discrete";
        case "boolean":
            return "Boolean";
        default:
            return "Unknown";
    }
}

function parseMapping(mapping) {
    mapping = flattenMapping(mapping);
    let values = _.keys(mapping).map(key => ({
        [key]: {
            title: _.startCase(key),
            field: key,
            type: getType(mapping[key])
        }
    }));
    mapping = values.reduce((prev, curr) => ({ ...prev, ...curr }), {});
    return mapping;
}

class ElasticSearch {
    constructor(config) {
        this.isReady = false;
        this.client = ElasticSearch.getESClientFromConfig(config);
        this.config = config;

        this.loadMapping().then(result => {
            this.mapping = result;
            this.setReady();
        });
    }

    setReady() {
        if (!this.isReady) {
            this.isReady = true;
            this.readyCallback(true);
        }
    }

    loadMapping() {
        const { client, config } = this;
        let confHash = hashCode(JSON.stringify(config));
        this.hash = confHash;
        /*if(localStorage.getItem(confHash)) {
            return Promise.resolve(JSON.parse(localStorage.getItem(confHash)))
        }*/

        return client.indices
            .getMapping({ index: config.index, type: config.type })
            .then(mapping => {
                mapping = mapping[config.type] || _.values(mapping)[0];
                mapping = _.get(mapping, `mappings.${config.type}`);
                mapping = parseMapping(mapping);
                return mapping;
            })
            .then(mapping => {
                let fields = _.values(mapping);
                let query = new Query();

                for (let field of fields) {
                    query.addStatsAggregation(field);
                }

                return this.execute(query)
                    .then(stats => {
                        stats = stats.aggregations;
                        for (let key of _.keys(stats)) {
                            if (stats[key].count === 0 || stats[key].value === 0) {
                                delete mapping[key];
                            } else {
                                mapping[key].stats = stats[key];
                            }
                        }
                        return mapping;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .then(mapping => {
                let query = new Query();
                query.setSize(200);
                return this.execute(query).then(sample => {
                    let flatted = sample.hits.hits.map(doc => flat(doc._source));
                    try {
                        flatted = flatted.reduce((prev = {}, curr) => {
                            for (let key of _.keys(curr)) {
                                let currentValue = curr[key];
                                let prevValue = prev[key];

                                if (_.isArray(currentValue)) {
                                    currentValue = currentValue.map(v => (_.isString(v) ? v.length : v));
                                    currentValue = _.sum(currentValue) / sample.hits.hits.length;
                                } else {
                                    currentValue = _.isString(currentValue) ? currentValue.length : currentValue;
                                }
                                if (!prevValue) {
                                    prev[key] = [];
                                }
                                prev[key].push(currentValue);
                            }
                            return prev;
                        }, {});

                        for (let key of _.keys(flatted)) {
                            if (mapping[key]) {
                                mapping[key].avg = _.mean(flatted[key]);
                            }
                        }
                        //localStorage.setItem(confHash, JSON.stringify(mapping))
                        return mapping;
                    } catch (err) {
                        console.error(err);
                    }
                });
            });
    }

    static getESClientFromConfig(config) {
        let hostConfig = _.pick(config, ["host", "port", "path"]);

        if (config.user) {
            hostConfig.auth = `${config.user}:${config.password}`;
        }
        var client = new elasticsearch.Client({ hosts: [hostConfig] });
        return client;
    }
    static testConfig(config) {
        const client = this.getESClientFromConfig(config);
        return client.indices.getMapping({ index: config.index, type: config.type }).then(result => ({ sucess: true })).catch(result => ({ sucess: true }));
    }

    static saveDataset(config) {
        return ElasticSearch.testConfig(config).then(result => {
            config.info = `${config.index}/${config.type}`;
            return config;
        });
    }

    static removeDataset(id) {
        return Promise.resolve(id);
    }

    execute(query) {
        return this.client.search({
            index: this.config.index,
            type: this.config.type,
            body: query.body
        });
    }

    getInterval(field, count) {
        let start = moment(field.stats.min);
        let end = moment(field.stats.max);
        let seconds = Math.ceil(end.diff(start, "seconds") / count);
        return `${seconds}s`;
    }

    getDistribution(field, filters, search, { size, include, ignoreField, maxDataPoints = 100 } = {}) {
        let query = new Query();
        if (ignoreField) {
            filters = { ...filters };
            delete filters[field.field];
        }

        query.addFilters(filters, this.mapping);
        query.addSearch(search.query, this.getSearchFields(search));

        let interval;
        if (field.type === "Date") {
            interval = this.getInterval(field, maxDataPoints);
        }

        query.addDistribution(field.field, field.type, { size, include, interval });
        return this.execute(query)
            .then(result =>
                result.aggregations[field.field].buckets.map(d => ({
                    label: d.key,
                    count: d.doc_count,
                    asString: d.key_as_string || d.key
                }))
            )
            .catch(error => console.log(error));
    }

    getSearchFields(search) {
        let types = _.isArray(search.types) ? search.types : [search.types];
        let fieldsList = _.keys(this.mapping);
        if (!types || types.length === 0) {
            return fieldsList;
        }
        let fields = fieldsList.filter(d => _.includes(types, this.mapping[d].type));
        return fields;
    }

    getDocuments(filters, search = {}, { size = 10 }) {
        let query = new Query();
        query.addFilters(filters, this.mapping);
        let searchFields = this.getSearchFields(search);
        query.addSearch(search.query, this.getSearchFields(search));
        query.addHighlight(searchFields);
        query.addHighlight(_.keys(filters));
        query.setSize(size);
        return this.execute(query).then(result => result.hits.hits.map(d => ({ ...flat(d._source), _id: d._id, _highlights_: d.highlight })));
    }

    ready() {
        if (!this.readyPromise) {
            this.readyPromise = new Promise((resolve, reject) => {
                this.readyCallback = resolve;
                if (this.isReady) {
                    resolve(true);
                }
            });
        }

        return this.readyPromise;
    }
}

export default ElasticSearch;
