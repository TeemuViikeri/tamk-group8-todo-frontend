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
      lineHeight: "35px",
      flex: this.props.flex
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
            padding="10px"
            placeholder="Any homework to do?"
            borderRadiusInput="12px"
            borderRadiusSubmit="12px"
            borderBottom="none"
            flexInput="7"
            flexBtn="1"
          />
        )}
      </div>
    );
  }
}

export default Dock;
