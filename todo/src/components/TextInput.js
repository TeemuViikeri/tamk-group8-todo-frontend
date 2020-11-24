import React, { Component } from "react";

class TextInput extends Component {
  getTextInputStyle = () => {
    return {
      flex: "10",
      padding: "10px",
      margin: "15px 20px",
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
        placeholder="Any homework to do?"
        value={this.props.title}
        onChange={this.props.onChange}
      />
    );
  }
}

export default TextInput;
