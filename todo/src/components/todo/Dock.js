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
      backgroundColor: this.props.bgColor,
      position: "absolute",
      bottom: "0",
      width: this.props.width,
      lineHeight: "35px",
    };
  };

  render() {
    return (
      <div style={this.getStyle()}>
        {this.state.isMobileView ? (
          <ButtonContainer />
        ) : (
          <TextInputField 
            addTodo={this.props.addTodo} 
            currentList={this.props.currentList}
            btnText="Add"
            borderRadiusInput="12px"
            borderRadiusSubmit="12px"
            borderBottom=""
            flex="10"
          />
        )}
      </div>
    );
  }
}

export default Dock;
