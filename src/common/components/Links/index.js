import React, { Component } from "react"
import Link from "./Link"

class Links extends Component {
  constructor(config, context){
    super(config);

    const flux = this.flux = context.flux;

    this.LinkStore = flux.getStore("LinkStore");
    this.LinkActions = flux.getActions("LinkActions");

    this.state = {
      links: this.LinkStore.getState()[`${this.props.type}Links`] || {}
    };

    this.LinkActions.getLinks(this.props.type);

    this.handleStateChange = this.handleStateChange.bind(this);
    this.buildLinks = this.buildLinks.bind(this);
    this.buildErr = this.buildErr.bind(this);
  }

  componentDidMount(){
    this.LinkStore.listen(this.handleStateChange);
  }

  componentWillUnmount(){
    this.LinkStore.unlisten(this.handleStateChange);
  }

  handleStateChange(data){
    this.setState(Object.assign(this.state, { links: data[`${this.props.type}Links`] }));
  }

  buildLinks(){
    const data = this.state.links.data ? this.state.links.data.children : [];

    const links = data.map((item, index) => {
      return (<Link data={item} key={index}/>)
    });

    return (
      <ul> { links } </ul>
    );
  }

  buildErr(){
    return (
      <div>
        <p>Very funny error message.</p>
      </div>
    )
  }

  render(){
    const content = this.state.links.error ? this.buildErr() : this.buildLinks();

    return (
      <div>
        { this.props.children }

        { content }
      </div>
    )
  }
}

Links.contextTypes = {
  flux: React.PropTypes.object
};

export default Links
