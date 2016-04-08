import React, { Component } from "react"
import { fetchLinks } from "../../flux/actionCreators"
import { connect } from "react-redux"
import Link from "./Link"

class Links extends Component {
  componentWillMount(){
    this.props.fetchLinks();
  }
  buildLinks(){
    const links = this.props.data.map((item, index) => {
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
    const content = this.props.error ? this.buildErr() : this.buildLinks();

    return (
      <div>
        { this.props.children }

        { content }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLinks: () => {
        dispatch(fetchLinks("javascript", ownProps.type));
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const data = state.has("javascript" + ownProps.type) && state.get("javascript" + ownProps.type).data || []
  const error = state.has("javascript" + ownProps.type) && state.get("javascript" + ownProps.type).error || false;

  return {
    data: data,
    error: error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)
