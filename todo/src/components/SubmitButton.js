import React, { Component } from "react";

class SubmitButton extends Component {
  getSubmitButtonStyle = () => {
    return {
      flex: "1",
      margin: "15px 20px 15px 0",
      boxShadow: "0px -0px 1px 4px rgba(255, 255, 255, .2)",
      border: "none",
      borderRadius: "12px",
    };
  };

  render() {
    return (
      <input
        type="submit"
        value="Add"
        className="btn"
        style={this.getSubmitButtonStyle()}
      />
    );
  }
}

export default SubmitButton;
