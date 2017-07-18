//Filters -----------------------------------------------
export const changeTermsFilter = (label, field, value) => ({ type:"CHANGE_TREMS_FILTER", label, field, value })
export const changeDateFieldFilter = (param, value, field) => ({type: "CHANGE_DATE_FIELD_FILTER", field, param, value})


//Search -------
export const doSearch = (query) => ({type: "DO_SEARCH", query});

//Reset
export const resetFilters = () => ({type: "RESET"})

//Show/Hide Faces
export const toggleFacedVisibility = (field) => ({type: "TOGGLE_FACET_VISIBILITY", field});
export const setFacedVisibility = (values) => ({type: "SET_FACET_VISIBILITY", values});



//Show/Hide on Snniptes 
export const toggleSnippetVisibility = (field) => ({type: "TOGGLE_SNIPPET_VISIBILITY", field});
export const setSnippetVisibility = (values) => ({type: "SET_SNIPPET_VISIBILITY", values});