import { actionConstants } from "../constants"
import { actionCreators } from "../actionCreators"
import fetch from "isomorphic-fetch"

export default function (state, action){
  switch (action.type) {
    case actionConstants.FETCH_LINKS_SUCCESS:
      return Object.assign({}, state, {
        [action.data.subreddit]: {
          [action.data.type]: {
            error: false,
            data: action.data.data.data.children
          }
        }
      });
    break;
    case actionConstants.FETCH_LINKS_ERROR:
      return Object.assign({}, state, {
        [action.data.subreddit]: {
          [action.data.type]: {
            error: action.data.error,
          }
        }
      });
    break;
    default:
    return state;
  }
}
