import React, { Component } from "react";

class TextInput extends Component {
  getTextInputStyle = () => {
    return {
      display: "inline-block",
      flex: this.props.flexInput,
      padding: this.props.padding,
      margin: this.props.marginInput,
      verticalAlign: this.props.verticalAlign,
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
        borderbottom={this.props.borderBottom}
        borderradius={this.props.borderRadiusInput}
      />
    );
  }
}

export default TextInput;
