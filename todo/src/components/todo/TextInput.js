import React, { Component } from "react";

class TextInput extends Component {
  getTextInputStyle = () => {
    return {
      display: "inline-block",
      flex: this.props.flexInput,
      padding: this.props.paddingInput,
      margin: this.props.marginInput,
      verticalAlign: this.props.verticalAlign,
      border: "none",
      borderBottom: this.props.borderBottom,
      borderRadius: this.props.borderRadiusInput,
      color: this.props.textColorInput,
      backgroundColor: this.props.bgColorInput,
      height: this.props.heightInput
    };
  };

  render() {
    return (
      <input
        id={this.props.idInput}
        type="text"
        name="title"
        autoComplete="off"
        style={this.getTextInputStyle()}
        placeholder={this.props.placeholder}
        value={this.props.title}
        onChange={this.props.onChange}
        onKeyUp={this.props.idInput === 'search' ? () => this.props.handleOnKeyUp(this.props.title) : () => {return}}
        borderbottom={this.props.borderBottom}
        borderradius={this.props.borderRadiusInput}
      />
    );
  }
}

export default TextInput;
