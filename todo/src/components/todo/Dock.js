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
            paddingInput="10px"
            paddingSubmit="10px"
            marginInput="15px 0 15px 20px"
            marginSubmit="15px 20px 15px 0"
            bgColorSubmit="gainsboro"
            textColorSubmit="black"
            placeholder="Any homework to do?"
            borderRadiusInput="12px 0 0 12px"
            borderRadiusSubmit="0 12px 12px 0"
            borderBottom="none"
            flexInput="10"
            flexBtn="1"
          />
        )}
      </div>
    );
  }
}

export default Dock;
