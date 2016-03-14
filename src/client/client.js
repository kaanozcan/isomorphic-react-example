import React from "react"
import ReactDom from "react-dom"

import App from "../common/components/App.jsx"

import { createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"

import linksReducer from "../common/flux/reducers/linksReducer.js"


function DOMContentLoaded(){
  const store = createStore(
    linksReducer,
    {javascript: {new: {}, hot: {}}},
    applyMiddleware(thunk)
  );

  ReactDom.render(<App store={store} path={window.location.pathname}/>, document.getElementById("root"));
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);
