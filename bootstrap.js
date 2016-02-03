require("babel-core/register")({
  presets: ["es2015", "react", "stage-0"]
});
require("babel-polyfill");
require("./src/server/server.js");
