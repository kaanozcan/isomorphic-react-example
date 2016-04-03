import constants from "../constants"
import { actionCreators } from "../actionCreators"
import fetch from "isomorphic-fetch"
import { Map } from "immutable"

const defaultState = Map({});
export default function (state = defaultState, action){
  switch (action.type) {
    case constants.linkActions.FETCH_SUCCESS:
      return state.set(action.data.subreddit + action.data.type, {
        error: false,
        data: action.data.data.data.children
      });
    break;
    case constants.linkActions.FETCH_ERROR:
      return state.set(action.data.subreddit + action.data.type, {
        error: action.data.error
      });
    break;
    default:
    return state;
  }
}
