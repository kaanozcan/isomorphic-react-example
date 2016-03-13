import React, { Component } from "react"
import { Locations, Location, Link } from "react-router-component"

import JavascriptLinks from "./JavascriptLinks.jsx"
import Home from "./Home.jsx"

class App extends Component {
  constructor(config){
    super(config);

    this.getChildContext = this.getChildContext.bind(this);
  }
  getChildContext(){
    return { store: this.props.store }
  }
  render(){
      return (
        <div>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/javascript-links">Hot Links</Link></li>
          </ul>

          <Locations path={this.props.path}>
            <Location path="/" handler={Home}/>
            <Location path="/javascript-links" handler={JavascriptLinks} store={this.props.store}/>
          </Locations>
        </div>
      );
  }
}

App.childContextTypes = {
  store: React.PropTypes.object
}

export default App
