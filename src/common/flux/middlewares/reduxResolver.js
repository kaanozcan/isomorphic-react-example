import process from "process"

let requests = [];

const middleware = store => next => action => {
  if(typeof action === "function") {
    const promise = action(next);

    if(process.browser){
      new Promise(promise);
    } else {
      requests.push(promise);
    }
  } else {
    next(action);
  }
}

export default function () {
  return {
    dispatchAll: function () {
      return Promise.all(requests.map(promise => new Promise(promise)));
    },
    resolver: middleware
  }
};
