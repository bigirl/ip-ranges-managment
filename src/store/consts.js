export const RULE_INTERNAL = "Internal";
export const RULE_EXTERNAL = "External";

export const MODE_ADD = "mode_add";
export const MODE_EDIT = "mode_edit";

export const defaultState = {
    groups: null,
    popupMode: false, // false || MODE_ADD || MODE_EDIT,
    groupId: null
};

export const actionTypes = {
    ADD_GROUP: "ADD_GROUP",
    EDIT_GROUP: "EDIT_GROUP",
    DELETE_GROUP: "DELETE_GROUP",
    UPDATE_POPUP_MODE: "UPDATE_POPUP_MODE",
    PRE_FETCH_DATA: "PRE_FETCH_DATA"
}


export function ip2int(ip) {
    return ip.split('.').reduce(function(ipInt, octet) { 
      return (ipInt<<8) + parseInt(octet, 10)
    }, 0) >>> 0;
}
  
export function ValidateIPaddress(ipaddress) {
    const IP_FORMAT = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipaddress.match(IP_FORMAT);
}
  
export const DEFAULT_IP_OBJ = {
    origin: null,
    number: 0
};

export const DEFAULT_VALIDATION_OBJ = {
    isValidName: false,
    isValidStartIP: false,
    isValidEndIP: true,
    errorMessage: null
};