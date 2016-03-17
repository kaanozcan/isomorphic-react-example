import { linkActions } from "../constants"
import { actionCreators } from "../actionCreators"
import fetch from "isomorphic-fetch"

export default function (state, action){
  switch (action.type) {
    case linkActions.FETCH_SUCCESS:
      return Object.assign({}, state, {
        [action.data.subreddit + action.data.type]: {
          error: false,
          data: action.data.data.data.children
        }
      });
    break;
    case linkActions.FETCH_ERROR:
      return Object.assign({}, state, {
        [action.data.subreddit + action.data.type]: {
            error: action.data.error,
        }
      });
    break;
    default:
    return state;
  }
}
