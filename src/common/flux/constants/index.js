const actions = {
  linkActions: {
    "FETCH": "FETCH",
    "FETCH_SUCCESS": "FETCH_SUCCESS",
    "FETCH_ERROR": "FETCH_ERROR"
  },
  requestActions: {
    "ADD": "ADD"
  }
};

const makeSymbol = function (ob){
  return Object.keys(ob).reduce(function (prev, curr){
    prev[curr] = typeof ob[curr] === "object" ? makeSymbol(ob[curr]) : Symbol(ob[curr]);

    return prev;
  }, {});
}

export default makeSymbol(actions);
