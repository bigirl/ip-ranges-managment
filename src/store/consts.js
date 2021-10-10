export const RULE_INTERNAL = "Internal";
export const RULE_EXTERNAL = "External";

export const MODE_ADD = "mode_add";
export const MODE_EDIT = "mode_edit";

export const defaultState = {
    groups: null,
    popupMode: false // false || MODE_ADD || MODE_EDIT
};

export const actionTypes = {
    ADD_GROUP: "ADD_GROUP",
    EDIT_GROUP: "EDIT_GROUP",
    DELETE_GROUP: "DELETE_GROUP",
    UPDATE_POPUP_MODE: "UPDATE_POPUP_MODE",
    PRE_FETCH_DATA: "PRE_FETCH_DATA"
}
