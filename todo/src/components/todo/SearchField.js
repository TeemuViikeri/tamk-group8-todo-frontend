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
          idInput="search"
          title={this.state.title} 
          handleOnKeyUp={this.props.handleOnKeyUp}
          placeholder="Search task"
          paddingInput="0.625rem"
          paddingSubmit="0.625rem"
          marginInput="0.9375rem 0 0.9375rem 1.25rem"
          marginSubmit="0.9375rem 1rem 0.9375rem 0"
          flexInput="3"
          flexBtn="1"
          btnText="Find"
          borderBottom="none"
          borderRadiusInput="0.75rem 0 0 0.75rem"
          borderRadiusSubmit="0 0.75rem 0.75rem 0"
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
