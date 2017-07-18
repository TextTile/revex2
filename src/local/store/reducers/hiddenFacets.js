import _ from 'lodash';

export default (state = [], action) => {
    switch (action.type) {
        case "TOGGLE_FACET_VISIBILITY":
            if(_.includes(state, action.field)) {
                state = _.without(state, action.field);
            } else {
                state = _.uniq([...state, action.field])
            }
            break;

        case "SET_FACET_VISIBILITY":
            state = action.values;
            break;
    
        default:
            break;
    }
    return state;
}