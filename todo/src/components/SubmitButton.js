import React, { Component } from "react";

class SubmitButton extends Component {
  getSubmitButtonStyle = () => {
    return {
      flex: this.props.flexBtn,
      backgroundColor: this.props.bgColorSubmit,
      color: this.props.textColorSubmit,
      margin: "15px 20px 15px 0",
      border: "none",
      borderRadius: this.props.borderRadiusSubmit,
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
