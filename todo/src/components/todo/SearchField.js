import React, { Component } from "react";
import TextInputField from "./TextInputField";

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  getStyle = () => {
    return {
      flex: "1",
      display: "inline-block", 
      lineHeight: "36px",
      position: "relative",
      bottom: "12px",
    }
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <TextInputField
          title={this.state.title} 
          placeholder="Search task"
          paddingInput="10px"
          paddingSubmit="10px"
          marginInput="15px 0 15px 20px"
          marginSubmit="15px 16px 15px 0"
          flexInput="3"
          flexBtn="1"
          btnText="Find"
          borderBottom="none"
          borderRadiusInput="12px 0 0 12px"
          borderRadiusSubmit="0 12px 12px 0"
          bgColorSubmit="gainsboro"
        />
      </div>
    )
  }
}

export default SearchField;
