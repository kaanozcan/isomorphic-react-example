import React, { Component } from "react"
import Links from "./Links"

class JavascriptLinks extends Component {
  constructor(config){
    super(config);

    const flux = this.flux = this.props.flux;

    this.LinkStore = flux.getStore("LinkStore");
    this.LinkActions = flux.getActions("LinkActions");

    this.state = {
      hotLinks: this.LinkStore.getState().hotLinks,
      newLinks: this.LinkStore.getState().newLinks,
      errLinks: this.LinkStore.getState().errLinks
    }

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
      const hotLinksData = this.state.hotLinks.data ? this.state.hotLinks.data.children : [];
      const newLinksData = this.state.newLinks.data ? this.state.newLinks.data.children : [];

      return (
        <div>
          <Links type="hot" data={hotLinksData}>
            <h3>Hot Javascript Links</h3>
          </Links>
          <Links type="new" data={newLinksData}>
            <h3>New Javascript Links</h3>
          </Links>
        </div>
      );
  }
}

export default JavascriptLinks
