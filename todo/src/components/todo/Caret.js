import React, { Component } from "react";

class Caret extends Component {
  constructor(props) {
    super(props);

    this.state = {
      up: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.up !== prevProps.up) {
      this.setState({ up: this.props.up });
    }
  }

  getUpCaretStyle = () => {
    return {
      display: "inline-block",
      width: "0",
      height: "0",
      borderWidth: "0.5rem",
      borderStyle: "solid",
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: this.props.palette.fillHeaderColor,
      borderLeftColor: "transparent",
      position: "relative",
      top: "0.25rem",
      cursor: "pointer",
      float: "right",
    }
  }

  getDownCaretStyle = () => {
    return {
      display: "inline-block",
      width: "0",
      height: "0",
      borderWidth: "0.5rem",
      borderStyle: "solid",
      borderTopColor: this.props.palette.fillHeaderColor,
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      borderLeftColor: "transparent",
      position: "relative",
      top: "0.75rem",
      cursor: "pointer",
      float: "right",
    }
  }
  
  render() {
    return (
      <span 
        onClick={this.props.toggleDisplay.bind(this, this.props.id)}
        style={this.state.up ? this.getUpCaretStyle() : this.getDownCaretStyle()}
      >
      </span>
    );
  }
}

export default Caret;
