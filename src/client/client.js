import React from "react"
import ReactDom from "react-dom"

import Iso from "iso"

import Flux from "../common/flux"
import App from "../common/components/App.jsx"

function DOMContentLoaded(){
  Iso.bootstrap((state, _, container) => {
      let flux = new Flux();
      flux.bootstrap(state);
      
      ReactDom.render(<App flux={flux} path={window.location.pathname}/>, document.getElementById("application-container"));

      flux.resolver.firstRender = false;
  });
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);
