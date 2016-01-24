import React, { Component } from "react"
import { Locations, Location, Link } from "react-router-component"

import ToDos from "./ToDos.jsx"
import Home from "./Home.jsx"

class App extends Component {
  constructor(config){
    super(config);
  }
  render(){
      return (
        <div>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/todos">ToDo's</Link></li>
          </ul>

          <Locations path={this.props.path}>
            <Location path="/" handler={Home}/>
            <Location path="/todos" handler={ToDos}/>
          </Locations>
        </div>
      );
  }
}

export default App
