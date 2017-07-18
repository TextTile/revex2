export default (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_DATASET_LIST':
            return action.datasets
    
        default:
            break;
    }
    return state;
}