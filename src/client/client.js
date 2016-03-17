import React from "react"
import ReactDom from "react-dom"

import App from "../common/components/App.jsx"

import { createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"

import resolver from "../common/flux/middleware/reduxResolver.js"
import linkReducer from "../common/flux/reducers/linkReducer.js"

import rootComponent from "../utils/root-component.js";

function DOMContentLoaded(){
  const store = createStore(
    linkReducer,
    {},
    applyMiddleware(resolver, thunk)
  );


  ReactDom.render(<App store={store} path={window.location.pathname}/>, document.getElementById("root"));
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);
