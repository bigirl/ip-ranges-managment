import {actionTypes, defaultState} from './consts';

const reducer = (state = defaultState, action) => {
    let newState, groupParent;
    let {index, popupMode, groupId} = action;

    switch (action.type) {
        case actionTypes.UPDATE_POPUP_MODE:
            return Object.assign({}, state, {popupMode, groupId});
        case actionTypes.ADD_GROUP:
            groupParent = [...state.groups];
            groupParent[groupParent.length] = action.payload;
            
            newState = Object.assign({}, state, {groups: groupParent});
            return newState;
        case actionTypes.EDIT_GROUP:
            groupParent = [...state.groups].map(group => group.groupId === action.payload.groupId
                ? action.payload
                : group);
            
            newState = Object.assign({}, state, {groups: groupParent});
            return newState;
        case actionTypes.DELETE_GROUP:
            groupParent = [...state.groups].filter(item => item.groupId !== index);
            //groupParent = groupParent.slice(0, index).concat(groupParent.slice(index + 1, groupParent.length))
            newState = Object.assign({}, state, {groups: groupParent});
            return newState;
        case actionTypes.PRE_FETCH_DATA:
            return Object.assign({}, action.payload.data, {
                popupMode: false} );
        default:
            return state
                
    }
}

export default reducer;
