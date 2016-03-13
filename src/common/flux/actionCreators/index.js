import { actionConstants } from "../constants"

export function fetchLinks (subreddit, type){
  return (dispatch) => {
    const url = `https://www.reddit.com/r/${subreddit}/${type}.json` ;
    fetch(url)
      .then(response => response.json())
      .then(json =>
        dispatch(
          fetchLinksSuccess(subreddit, type, JSON.parse(json)
        )
      ),
      err =>
        dispatch(
          fetchLinksError(subreddit, type, err
        )
      )
    )
  }
}

export function fetchLinksSuccess (subreddit, type, data){
  return {
    type: actionConstants.FETCH_LINKS_SUCCESS,
    data: {
      subreddit,
      type,
      data
    }
  }
}

export function fetchLinksError (subreddit, type, error){
  return {
    type: actionConstants.FETCH_LINKS_ERROR,
    data: {
      subreddit,
      type,
      error
    }
  }
}
