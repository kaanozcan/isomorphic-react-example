import { requestActions } from "../constants"
import { actionCreators } from "../actionCreators"
import fetch from "isomorphic-fetch"

export default function (state, action){
  switch (action.type) {
    case requestActions.ADD:

    break;
    default:
    return state;
  }
}
