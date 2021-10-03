import {actionTypes} from './consts';

export const resetFilters = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESET_FILTERS
        })
    }
}

export const searchItems = (showPIIonly,searchText) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SEARCH_ITEMS,
            searchText,
            showPIIonly
        })
    }
}

export const setActiveTab = (payload) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_ACTIVE_TAB,
            payload
        })
    }
}

export const setPII = (payload, activeTab, group, index) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_PII,
            payload, 
            activeTab, 
            group, 
            index
        })
    }
}

export const setMASKED = (payload, activeTab, group, index) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_MASKED,
            payload,
            activeTab, 
            group, 
            index
        })
    }
}


export const formatData = (json) => {
    return{
        api: json.api,
        method: json.method,
        path: json.path,
        response: json.response, 
        request: json.request
    }
};

//synchronous action creator
const fetchDataSuccess = data => ({
    type: actionTypes.PRE_FETCH_DATA,
    payload: { data }
})

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchData = () => {
    return async dispatch => {
        try {
            fetch('fe_data.json',{
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
                })
            .then(response => response.json())
            .then(json => dispatch(fetchDataSuccess(formatData(json))))
        }
        catch(e) {
               console.error(e); 
            }
    }
}
