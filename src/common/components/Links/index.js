import React, { Component } from "react"
import Link from "./Link"

class Links extends Component {
  render(){
console.log("context", this.context.flux);

    const links = this.props.data ? this.props.data.map((item, index) => {
      return (<Link data={item.data} key={index}/>)
    }) : null;

    return (
      <ul>
        {links}
      </ul>
    )
  }
}

Links.contextTypes = {
  flux: React.PropTypes.object
}

export default Links
