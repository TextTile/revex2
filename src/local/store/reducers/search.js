const initialState = { query:"", types: "Text" }
export default (state = initialState, action) => {
    switch (action.type) {
        case "DO_SEARCH":
            state = { ...state, query:  action.query };
            break;
            
         case "RESET": 
            state = initialState;
            break;

        default:
            break;
    }
    return state;
}