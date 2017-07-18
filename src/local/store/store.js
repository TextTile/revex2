import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'
import listeners from './listeners';

const preloadedState = {}

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, preloadedState,composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(mySaga)
listeners.setListeners(store);

store.dispatch({type: "LOAD_INITIAL_DATA"});

export default store;