import express from "express"
import React from "react"
import { renderToString } from "react-dom/server"

import App from "./src/components/App.jsx"

let server = express();

server.use('/assets', express.static(__dirname + '/public'));

server.use("/", function (req, res, next){
  console.log(req.url);
  if(req.url === "/favicon.ico"){
    next();
  }

  const markup = renderToString(<App path={req.url}/>);

  res.status(200).send(`
    <html>
      <head>
        <script src="/assets/bundle.js"></script>
      </head>
      <body>
        <div id="application-container">
          ${markup}
        </div>
      </body>
    </html>`
  );
});

const port = 7000;
server.listen(port);
console.log(`Server is on port ${port}`);
