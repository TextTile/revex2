import stopWords from "../stopwords";
import moment from "moment";
class Query {
    constructor() {
        this.body = {
            size: 0
        };
    }

    prepareAggs() {
        this.body.aggs = this.body.aggs || {};
        return this.body.aggs;
    }

    prepareQuery() {
        this.body.query = this.body.query || {
            bool: {
                must: []
            }
        };
    }

    prepareHighlight() {
        this.body.highlight = this.body.highlight || {
            fields: {}
        };
        return this.body.highlight.fields;
    }

    addFilters(filters, mapping) {
        this.prepareQuery();

        for (let key in filters) {
            if (Object.prototype.hasOwnProperty.call(filters, key)) {
                this.body.query.bool.must.push(this.getFilter(key, filters[key], mapping[key]));
            }
        }
        this.body.query.bool.must = this.body.query.bool.must.filter(d => d);
        if (this.body.query.bool.must.length === 0) {
            delete this.body.query;
        }
    }

    getFilter(field, values, fieldInfo) {
        let result;
        if (fieldInfo.type === "Date") {
            if (values.start || values.end) {
                result = { range: { [field]: { format: "dd/MM/yyyy" } } };
                if (values.start) {
                    result.range[field].gte = moment(values.start).format("DD/MM/YYYY");
                }
                if (values.end) {
                    result.range[field].lte = moment(values.end).format("DD/MM/YYYY");
                }
            }
            return result;
        }
        if (values && values.length > 0) {
            return {
                terms: { [field]: values }
            };
        }
        return undefined;
    }

    setSize(size) {
        this.body.size = size;
    }

    addHighlight(fields) {
        if (fields && fields.length > 0) {
            let hightlights = this.prepareHighlight();
            for (let field of fields) {
                hightlights[field] = {};
            }
        }
    }

    addSearch(search, fields) {
        if (search) {
            this.prepareQuery();
            let esQuery = {
                query_string: {
                    fields: fields,
                    query: search
                }
            };
            this.body.query.bool.must.push(esQuery);
        }
    }

    addStatsAggregation(field) {
        let aggs = this.prepareAggs();
        const { type } = field;
        let agg;
        switch (type) {
            case "Continuous":
            case "Discrete":
            case "Date":
                agg = { stats: { field: field.field } };
                break;

            case "Categorical":
                agg = { cardinality: { field: field.field } };
                break;
            default:
                break;
        }
        if (agg) {
            aggs[field.field] = agg;
        }
    }

    addDistribution(field, type, { size = 5, interval = "day", include } = {}) {
        let agg = {};
        this.prepareAggs();
        switch (type) {
            case "Date":
                agg = {
                    date_histogram: {
                        field: field,
                        interval: interval,
                        min_doc_count: 1
                    }
                };
                break;
            case "Text":
                agg = {
                    significant_terms: {
                        field,
                        size,
                        include,
                        exclude: stopWords
                    }
                };
                break;

            case "Continuous":
            case "Discrete":
                agg = {
                    histogram: {
                        field: field,
                        interval: 1
                    }
                };
                break;

            default:
                agg = {
                    terms: {
                        field,
                        size,
                        include
                    }
                };
                break;
        }
        this.body.aggs[field] = agg;
    }
}

export default Query;
