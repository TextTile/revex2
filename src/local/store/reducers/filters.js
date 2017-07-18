import _ from "lodash";

function addIfNot(array, value, predicate) {
    let exist = false;
    if (predicate) {
        exist = array.filter(predicate).length > 0;
    } else {
        exist = array.indexOf(value) > -1;
    }
    if (!exist) {
        array = [...array, value];
    }
    return array;
}

export default (state = {}, action) => {
    const { label, field, value } = action;
    switch (action.type) {
        case "CHANGE_TREMS_FILTER":
            let fieldFilter = state[field] || [];
            if (value) {
                fieldFilter = addIfNot(fieldFilter, label);
            } else {
                fieldFilter = _.without(fieldFilter, label);
            }
            state = { ...state, [field]: fieldFilter };
            break;

        case "RESET":
            state = {};
            break;
        case "CHANGE_DATE_FIELD_FILTER":
            let dateFieldFilter = state[field] || {};
            dateFieldFilter[action.param] = value;
            state = { ...state, [field]: dateFieldFilter };
            break;
        default:
            break;
    }
    return state;
};

//{ type:"CHANGE_TREMS_FILTER", label, field, value }
