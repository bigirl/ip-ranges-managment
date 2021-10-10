import {actionTypes, defaultState} from './consts';

const reducer = (state = defaultState, action) => {
    let newState, groupParent, group;
    let {index, name, start, end, internal, created, popupMode} = action;

    switch (action.type) {
        case actionTypes.UPDATE_POPUP_MODE:
            return Object.assign({}, state, {popupMode});
        case actionTypes.ADD_GROUP:
            groupParent = [...state.groups];
            groupParent[index] =  {name, start, end, internal, created};
            
            newState = Object.assign({}, state, {groups: groupParent});
            return newState;
        case actionTypes.EDIT_GROUP:
            groupParent = [...state.groups];
            group = {...groupParent[index]};
            group.name = name;
            groupParent[index] = group;
            
            newState = Object.assign({}, state, {groups: groupParent});
            return newState;
        case actionTypes.DELETE_GROUP:
            groupParent = [...state.groups];
            groupParent = groupParent.slice(0, index).concat(groupParent.slice(index + 1, groupParent.length))
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
