import {combineReducers} from "redux";
import datasets from './datasets'
import filters from './filters'
import search from './search';
import hiddenFacets from './hiddenFacets';
import snippetsFields from './snippetsFields';
import readonly from './readonly';

export default combineReducers({ datasets, filters, search, hiddenFacets, snippetsFields, readonly });