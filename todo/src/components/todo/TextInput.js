import React, { Component } from "react";

class TextInput extends Component {
  getTextInputStyle = () => {
    return {
      display: "inline-block",
      flex: this.props.flex,
      width: "100%",
      padding: this.props.padding,
      margin: this.props.margin,
      verticalAlign: this.props.verticalAlign,
      boxShadow: "0px -0px 1px 4px rgba(255, 255, 255, .2)",
      border: "none",
      borderRadius: "12px",
      color: "black",
    };
  };

  render() {
    return (
        <input
          type="text"
          name="title"
          style={this.getTextInputStyle()}
          placeholder={this.props.placeholder}
          value={this.props.title}
          onChange={this.props.onChange}
        />
    );
  }
}

export default TextInput;
