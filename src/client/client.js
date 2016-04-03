import React from "react"
import ReactDom from "react-dom"
import { createStore, applyMiddleware} from "redux"
import { Provider } from "react-redux"
import { Map } from "immutable"
import App from "../common/components/App.jsx"

import resolver from "../common/flux/middlewares/reduxResolver.js"
import linkReducer from "../common/flux/reducers/linkReducer.js"

function DOMContentLoaded(){
  const resolverMiddleware = resolver();

  const store = createStore(
    linkReducer,
    Map(),
    applyMiddleware(resolverMiddleware.resolver)
  );


  ReactDom.render(
    <Provider store={store}>
      <App path={window.location.pathname}/>
    </Provider>,
    document.getElementById("root"));
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);
