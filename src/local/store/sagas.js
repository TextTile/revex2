import { put, takeLatest } from 'redux-saga/effects'
import remote from '../../remote'

export function* getDatasets(action) {
    let datasets = yield remote.getDatasets();
    let readOnly = yield remote.readOnly;
    
    yield put({ type: 'CHANGE_DATASET_LIST', datasets })
    yield put({ type: 'CHANGE_REMOTE_READONLY', readOnly })
}

export function* loadInitData(action) {
    yield put({ type: 'LOAD_DATASET_LIST' })
}

//----------------------------------------------------------------
export function* rootSaga() {
    yield takeLatest('LOAD_DATASET_LIST', getDatasets)
    yield takeLatest('LOAD_INITIAL_DATA', loadInitData)
}


export default rootSaga;