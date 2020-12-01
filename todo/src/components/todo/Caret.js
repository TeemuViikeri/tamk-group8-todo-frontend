import React, { Component } from "react";

class Caret extends Component {
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
        onClick={this.props.toggleShow.bind(this, this.props.id)}
        style={this.getCaretStyle()}
      >
      </span>
    );
  }
}

export default Caret;
