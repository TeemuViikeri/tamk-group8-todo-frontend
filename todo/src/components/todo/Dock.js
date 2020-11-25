import React, { Component } from "react";
import ButtonContainer from "../ButtonContainer";
import TextInputField from "./TextInputField";

class Dock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileView: false,
    };
  }

  getStyle = () => {
    return {
      backgroundColor: "#cc5252",
      position: "absolute",
      bottom: "0",
      width: "80%",
      lineHeight: "35px",
    };
  };

  render() {
    return (
      <div style={this.getStyle()}>
        {this.state.isMobileView ? (
          <ButtonContainer />
        ) : (
          <TextInputField addTodo={this.props.addTodo} />
        )}
      </div>
    );
  }
}

export default Dock;
