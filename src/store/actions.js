import {actionTypes} from './consts';

export const addGroup = (payload) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.ADD_GROUP,
            payload
        })
    }
}

export const editGroup = (payload) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.EDIT_GROUP,
            payload
        })
    }
}

export const deleteGroup = (index) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DELETE_GROUP,
            index
        })
    }
}

export const updatePopupMode = (popupMode, groupId) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_POPUP_MODE,
            popupMode,
            groupId
        })
    }
}

export const formatData = (json) => {
    return{
        groups: json.groups,
        popupMode: false
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
