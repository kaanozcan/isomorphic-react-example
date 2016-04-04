import React from "react"
import { renderToString } from "react-dom/server"
import { createStore, applyMiddleware} from "redux"
import { Provider } from "react-redux"
import { Map } from "immutable"
import linkReducer from "../common/flux/reducers/linkReducer.js"

import resolver from "../common/flux/middlewares/reduxResolver.js"

import App from "../common/components/App.jsx"

export default function (req, res, next){
  const resolverMiddleware = resolver();

  let store = createStore(
    linkReducer,
    applyMiddleware(resolverMiddleware.resolver)
  );

  let markup = renderToString(<Provider store={store}><App path={req.url}/></Provider>);

  resolverMiddleware.dispatchAll().then(() => {
    const finalStore = createStore(
      linkReducer,
      store.getState(),
      applyMiddleware(resolverMiddleware.resolver)
    );

    markup = renderToString(<Provider store={finalStore}><App path={req.url}/></Provider>);

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
