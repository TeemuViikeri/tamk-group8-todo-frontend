import React, { Component } from "react";

class Caret extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  getCaretStyle = () => {
    return {
      width: "0",
      height: "0",
      borderStyle: "solid",
      borderWidth: "6px 6px 0 6px",
      borderColor: "#cc5252 transparent transparent transparent",
      position: "relative",
      top: "21px",
      left: "10px",
      cursor: "pointer"
    }
  }

  render() {
    return (
      <span 
        id={this.props.id}
        onClick={(e) => {
          // Add onClick event here
        }}
        style={this.getCaretStyle()}>
      </span>
    );
  }
}

export default Caret;
