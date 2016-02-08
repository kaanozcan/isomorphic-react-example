import React, { Component } from "react"

class Link extends Component{
  render(){
    return (<li><a href={this.props.data.data.url}>{this.props.data.data.title}</a></li>)
  }
}

export default Link
