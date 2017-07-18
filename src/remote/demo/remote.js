import datasets from './datasets'
const DBS = {
    Elasticsearch: require('../db/ElasticSearch').default
}
function test(config) {
    
}

function saveDataset(config) {
    
}

function removeDataset(type, id) {
    
}

function getDatasets() {
    return datasets.datasets;
}

function on(event, callback) {
    
}

function newInstance(config) {
    const db = new DBS[config.type](config.config);
    return db.ready().then(result => {
        return db;
    })
}

const readOnly = true;

export default {test, saveDataset, on, getDatasets, removeDataset, newInstance, readOnly}