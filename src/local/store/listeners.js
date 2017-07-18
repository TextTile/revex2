import remote from '../../remote'
export default {
    setListeners: (store) => {
        remote.on('datasets-changed', (event, data) => {
            store.dispatch({ type: "CHANGE_DATASET_LIST", datasets: data });
        });
    }
}