import React, { Component } from "react";

class SubmitButton extends Component {
  getSubmitButtonStyle = () => {
    return {
      flex: this.props.flexBtn,
      backgroundColor: this.props.bgColorSubmit,
      color: this.props.textColorSubmit,
      margin: this.props.marginSubmit,
      border: "none",
      borderRadius: this.props.borderRadiusSubmit,
      padding: this.props.paddingSubmit
    };
  };

  render() {
    return (
      <input
        type="submit"
        value={this.props.text}
        className="btn"
        style={this.getSubmitButtonStyle()}
      />
    );
  }
}

export default SubmitButton;
