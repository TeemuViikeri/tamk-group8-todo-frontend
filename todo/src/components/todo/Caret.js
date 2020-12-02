import React, { Component } from "react";

class Caret extends Component {
  constructor(props) {
    super(props);

    this.state = {
      up: this.props.up,
    }
  }

  getCaretStyle = () => {
    return {
      display: "inline-block",
      width: "0",
      height: "0",
      borderStyle: "solid",
      borderWidth: "6px 6px 0 6px",
      borderColor: "#cc5252 transparent transparent transparent",
      position: "relative",
      bottom: "6px",
      left: "6px",
      cursor: "pointer",
      transform: this.props.up ? "rotate(0.5turn)" : "",
      transition: "all .2s linear"
    }
  }
  
  render() {
    return (
      <span 
        onClick={this.props.toggleDisplay.bind(this, this.props.id)}
        style={this.getCaretStyle()}
      >
      </span>
    );
  }
}

export default Caret;
