import React, { Component } from "react"
import { fetchLinks } from "../../flux/actionCreators"
import Link from "./Link"

class Links extends Component {
  constructor(config, context){
    super(config);

    const store = this.store = context.store;
    console.log(this.store);
    const storeState = store.getState();

    this.state = {
      links: storeState.javascript || storeState.javascript[this.props.type] || {}
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.buildLinks = this.buildLinks.bind(this);
    this.buildErr = this.buildErr.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(this.handleStateChange);
    this.store.dispatch(fetchLinks("javascript", this.props.type));
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleStateChange(data){
    this.setState(
      Object.assign(this.state, data)
    );
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
  store: React.PropTypes.object
};

export default Links
