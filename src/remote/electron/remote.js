const {ipcRenderer} = window.require('electron')

const DBS = {
    Elasticsearch: require('../db/ElasticSearch').default
}
function test(config) {
    const DB = DBS[config.type];
    return DB.testConfig(config.config);
}

function saveDataset(config) {
    const DB = DBS[config.type];
    
    return DB.saveDataset(config.config).then(connection => {
        config.config = connection;
        ipcRenderer.send('save-dataset', config);
        return config;
    });
}

function removeDataset(type, id) {
    const DB = DBS[type];
    
    return DB.removeDataset(id).then(connection => {
        ipcRenderer.send('remove-dataset', id);
        return id;
    });
}

function getDatasets() {
    return ipcRenderer.sendSync('get-datasets');
}

function on(event, callback) {
    return ipcRenderer.on(event, callback);
}

function newInstance(config) {
    const db = new DBS[config.type](config.config);
    return db.ready().then(result => {
        return db;
    })
}


export default {test, saveDataset, on, getDatasets, removeDataset, newInstance}