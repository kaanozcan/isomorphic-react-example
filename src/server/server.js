import config from "../../config.json"

import path from "path"

import express from "express"
import favicon from "serve-favicon"

import React from "react"
import { renderToString } from "react-dom/server"

import Iso from "iso"

import Flux from "../common/flux"
import App from "../common/components/App.jsx"

let server = express();

server.use(favicon(path.join(__dirname, '../../public/favicon/favicon.ico')));

server.use("/assets", express.static(path.join(__dirname, "../../public")));

server.use("/", function (req, res, next){
  const flux = new Flux();
  let markup = renderToString(<App flux={flux} path={req.url}/>);

  flux.resolver.dispatchPendingActions().then(() => {
    markup = renderToString(<App flux={flux} path={req.url}/>);

    const body = Iso.render(markup, flux.flush());

    res.status(200).send(
      `<html>
        <head>
          <script src="/assets/bundle.js"></script>
        </head>
        <body>
          ${body}
        </body>
      </html>`
    );

  });
});

server.listen(config.port);
console.log(`Server is on port ${config.port}`);
