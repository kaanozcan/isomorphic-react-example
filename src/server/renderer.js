import React from "react"
import { renderToString } from "react-dom/server"
import { createStore, applyMiddleware} from "redux"
import linksReducer from "../common/flux/reducers/linksReducer.js"
import thunk from "redux-thunk"
import App from "../common/components/App.jsx"


export default function (req, res, next){
  console.log(linksReducer);
  const store = createStore(
    linksReducer,
    {javascript: {new: {}, hot: {}}},
    applyMiddleware(thunk)
  );

  let markup = renderToString(<App store={store} path={req.url}/>);

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
}
