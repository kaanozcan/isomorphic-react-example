import React, { Component } from "react"
import Links from "./Links"

class JavascriptLinks extends Component {
  render(){
      return (
        <div>
          <Links type="hot">
            <h3>Hot Javascript Links</h3>
          </Links>
          <Links type="new">
            <h3>New Javascript Links</h3>
          </Links>
          <Links type="gimmeerr">
            <h3>Nice Little Error Here</h3>
          </Links>
        </div>
      );
  }
}



export default JavascriptLinks
