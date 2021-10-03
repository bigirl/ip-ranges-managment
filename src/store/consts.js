export const ACTIVE_TAB_REQUEST = "request";
export const ACTIVE_TAB_RESPONSE = "response";

export const DEFAULT_API = "api.someurl.com";
export const DEFAULT_METHOD = "get";
export const DEFAULT_PATH = "somepath/home";

export const defaultState = {
    api: DEFAULT_API,
    method: DEFAULT_METHOD,
    path: DEFAULT_PATH,
    response: null,
    request: null,
    activeTab: ACTIVE_TAB_REQUEST,
    showPIIonly: false,
    searchText: ""
};

export const actionTypes = {
    SET_PII: "SET_PII",
    SET_MASKED: "SET_MASKED",
    SET_ACTIVE_TAB: "SET_ACTIVE_TAB",
    PRE_FETCH_DATA: "PRE_FETCH_DATA",
    SEARCH_ITEMS: "SEARCH_ITEMS",
    RESET_FILTERS: "RESET_FILTERS"
}
