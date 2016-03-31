import React from "react"
import { renderToString } from "react-dom/server"
import { createStore, applyMiddleware} from "redux"
import linkReducer from "../common/flux/reducers/linkReducer.js"

import resolver from "../common/flux/middlewares/reduxResolver.js"

import App from "../common/components/App.jsx"

export default function (req, res, next){
  const resolverMiddleware = resolver();

  let store = createStore(
    linkReducer,
    {javascript: {new: {}, hot: {}}},
    applyMiddleware(resolverMiddleware.resolver)
  );

  let markup = renderToString(<App store={store} path={req.url}/>);

  resolverMiddleware.dispatchAll().then(() => {
    markup = renderToString(<App store={store} path={req.url}/>);

    res.status(200).send(
        `<html>
        <head>
          <script src="/assets/bundle.js"></script>
        </head>
        <body>
          <div id="root">
            ${markup}
          </div>
        </body>
      </html>`
    );
  });
}
