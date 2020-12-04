import React, { Component } from "react";

class SubmitButton extends Component {
  getSubmitButtonStyle = () => {
    return {
      flex: "1",
      backgroundColor: this.props.bgColorSubmit,
      color: this.props.textColorSubmit,
      margin: "15px 20px 15px 0",
      boxShadow: "0px -0px 1px 4px rgba(255, 255, 255, .2)",
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
