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
      display: "inline-block"
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
          bgColorInput={this.props.palette.fillInputColor}
          textColorInput={this.props.palette.fillTextColor}
          bgColorSubmit={this.props.palette.fillButton}
          textColorSubmit={this.props.palette.fillTextColor}
        />
      </div>
    )
  }
}

export default SearchField;
