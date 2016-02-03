import config from "../../../config.json"
import fetch from "isomorphic-fetch"

class RequestHelper {
  request({url, options, isOut}){
    if(isOut){
      return fetch(url, options)
    } else {
      return fetch(config.baseUrl + url, options);
    }
  }
}

export default RequestHelper;
