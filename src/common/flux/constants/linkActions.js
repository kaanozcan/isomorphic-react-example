import unique from "../../utils/unique-constant"

const actions = {
    "FETCH": "FETCH",
    "FETCH_SUCCESS": "FETCH_SUCCESS",
    "FETCH_ERROR": "FETCH_ERROR"
};


export const linkActions = unique(actions);
