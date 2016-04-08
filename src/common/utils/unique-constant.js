export default function (ob){
  return Object.keys(ob).reduce(function (prev, curr){
    prev[curr] = typeof ob[curr] === "object" ? makeSymbol(ob[curr]) : Symbol(ob[curr]);

    return prev;
  }, {});
};
