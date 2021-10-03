import {actionTypes, defaultState} from './consts';

const reducer = (state = defaultState, action) => {
    let newState, groupParent, itemArr;
    let { activeTab, group, index} = action;

    switch (action.type) {
        case actionTypes.RESET_FILTERS:
            return Object.assign({}, state, {showPIIonly: false, searchText: ''});
        case actionTypes.SEARCH_ITEMS:
            return Object.assign({}, state, {showPIIonly: action.showPIIonly, searchText: action.searchText});
        case actionTypes.SET_PII:
            groupParent = state[activeTab][group];
            itemArr = {...groupParent[index]};
            itemArr.pii = action.payload;
            groupParent[index] = itemArr;
            
            newState = Object.assign({}, state, {
                [activeTab]: {...state[activeTab],
                    [group]: groupParent
                }
            });
            return newState;
        case actionTypes.SET_MASKED:
            groupParent = state[activeTab][group];
            itemArr = {...groupParent[index]};
            itemArr.masked = action.payload;
            groupParent[index] = itemArr;
            
            newState = Object.assign({}, state, {
                [activeTab]: {...state[activeTab],
                    [group]: groupParent
                }
            });
            return newState;
        case actionTypes.SET_ACTIVE_TAB:
            return Object.assign({}, state, {activeTab: action.payload});
        case actionTypes.PRE_FETCH_DATA:
            return Object.assign({}, action.payload.data, {
                activeTab: state.activeTab, 
                showPIIonly: state.showPIIonly,
                searchText: null} );
        default:
            return state
                
    }
}

export default reducer;
