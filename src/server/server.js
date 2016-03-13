import config from "../../config.json"

import path from "path"

import express from "express"
import favicon from "serve-favicon"
import renderer from "./renderer.js"

let server = express();

server.use(favicon(path.join(__dirname, '../../public/favicon/favicon.ico')));

server.use("/assets", express.static(path.join(__dirname, "../../public")));

server.use("/", renderer);

server.listen(config.port);
console.log(`Server is on port ${config.port}`);
