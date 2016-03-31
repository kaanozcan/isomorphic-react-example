import React from "react"
import ReactDom from "react-dom"

import App from "../common/components/App.jsx"

import { createStore, applyMiddleware} from "redux"

import resolver from "../common/flux/middlewares/reduxResolver.js"
import linkReducer from "../common/flux/reducers/linkReducer.js"

function DOMContentLoaded(){
  const resolverMiddleware = resolver();

  const store = createStore(
    linkReducer,
    {},
    applyMiddleware(resolverMiddleware.resolver)
  );


  ReactDom.render(<App store={store} path={window.location.pathname}/>, document.getElementById("root"));
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);
