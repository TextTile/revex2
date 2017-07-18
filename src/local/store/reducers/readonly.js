export default (state = false, action) => {
    switch (action.type) {
        case "CHANGE_REMOTE_READONLY":
            return action.readOnly || false;
    
        default:
            break;
    }
    return state;
}