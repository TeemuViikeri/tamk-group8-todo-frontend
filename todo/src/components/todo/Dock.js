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
      backgroundColor: this.props.palette.primary,
      lineHeight: "2.1875rem",
      height: "4.0625rem",
      flex: this.props.flex,
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
            paddingInput="0.625rem"
            paddingSubmit="0.625rem"
            marginInput="0.9375rem 0 0.9375rem 1.25rem"
            marginSubmit="0.9375rem 1.25rem 0.9375rem 0"
            bgColorSubmit={this.props.palette.fillButton}
            textColorSubmit={this.props.palette.fillTextColor}
            bgColorInput={this.props.palette.fillInputColor}
            textColorInput={this.props.palette.fillTextColor}
            placeholder="Any homework to do?"
            borderRadiusInput="0.75rem 0 0 0.75rem"
            borderRadiusSubmit="0 0.75rem 0.75rem 0"
            borderBottom="none"
            flexInput="10"
            flexBtn="1"
            showButton={true}
          />
        )}
      </div>
    );
  }
}

export default Dock;
