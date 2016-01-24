import React from "react"
import ReactDom from "react-dom"

import App from "./components/App.jsx"

function DOMContentLoaded(){
  console.log(window.locaiton);

  ReactDom.render(<App path={window.location.pathname}/>, document.getElementById("application-container"));
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);
console.log("sup yo");
