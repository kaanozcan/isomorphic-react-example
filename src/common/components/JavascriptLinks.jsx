import React, { Component } from "react"

class JavascriptLinks extends Component {
  constructor(config){
    super(config);

    const flux = this.flux = this.props.flux;

    this.LinkStore = flux.getStore("LinkStore");
    this.LinkActions = flux.getActions("LinkActions");

    this.state = {
      hotLinks: this.LinkStore.getState().hotLinks,
      newLinks: this.LinkStore.getState().newLinks
    }

    this.LinkActions.getLinks("hot");
    this.LinkActions.getLinks("new");

    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount(){
    this.LinkStore.listen(this.handleStateChange);
  }

  componentWillUnmount(){
    this.LinkStore.unlisten(this.handleStateChange);
  }

  handleStateChange(data){
    this.setState(Object.assign(this.state, data));
  }

  render(){
      const hotLinks = this.state.hotLinks.data ? this.state.hotLinks.data.children.map((item, index) => {
        return (<li><a href={item.data.url} target="_blank" key={index}>{item.data.title}</a></li>)
      }) : null;

      const newLinks = this.state.newLinks.data ? this.state.newLinks.data.children.map((item, index) => {
        return (<li><a href={item.data.url} target="_blank" key={index}>{item.data.title}</a></li>)
      }) : null;

      return (
        <div>
          <h3>Hot Javascript Links</h3>
          <ul>
            {hotLinks}
          </ul>
          <h3>New Javascript Links</h3>
          <ul>
            {newLinks}
          </ul>
        </div>
      );
  }
}

export default JavascriptLinks
