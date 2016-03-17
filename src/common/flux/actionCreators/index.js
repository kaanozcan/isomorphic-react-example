import { linkActions } from "../constants"

export function fetchLinks (subreddit, type){
  return (dispatch) => {
    const url = `https://www.reddit.com/r/${subreddit}/${type}.json` ;
    fetch(url)
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          return response;
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }

        return response.json()
      })
      .then(response => response.json())
      .then(json =>
        dispatch(
          fetchLinksSuccess(subreddit, type, json
        )
      ),
        err => dispatch(fetchLinksError(subreddit, type, err))
    )
  }
}

export function fetchLinksSuccess (subreddit, type, data){
  return {
    type: linkActions.FETCH_SUCCESS,
    data: {
      subreddit,
      type,
      data
    }
  }
}

export function fetchLinksError (subreddit, type, error){
  return {
    type: linkActions.FETCH_ERROR,
    data: {
      subreddit,
      type,
      error
    }
  }
}
