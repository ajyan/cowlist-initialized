import React from "react";

class Cow extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        clicked: false
      }
    }
  
    render() {
    return (<div id={this.props.num} onClick={this.props.onClick}>
      {this.props.cowName}
    </div>) 
    }  
  }

  export default Cow;