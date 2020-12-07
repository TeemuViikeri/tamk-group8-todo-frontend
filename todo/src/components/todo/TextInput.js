import React, { Component } from "react";

class TextInput extends Component {
  getTextInputStyle = () => {
    return {
      width: this.props.width,
      display: "inline-block",
      flex: this.props.flex,
      padding: this.props.padding,
      margin: this.props.margin,
      verticalAlign: this.props.verticalAlign,
      boxShadow: "0px -0px 1px 4px rgba(255, 255, 255, .2)",
      border: "none",
      borderBottom: this.props.borderBottom,
      borderRadius: this.props.borderRadiusInput,
      color: "black",
      backgroundColor: this.props.bgColorInput
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
          borderBottom={this.props.borderBottom}
          borderRadius={this.props.borderRadiusInput}
        />
    );
  }
}

export default TextInput;
