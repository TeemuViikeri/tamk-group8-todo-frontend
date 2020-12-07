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
          padding="8px"
          flexInput="3"
          flexBtn="1"
          btnText="Find"
          borderBottom="none"
          borderRadiusInput="12px"
          borderRadiusSubmit="12px"
        />
      </div>
    )
  }
}

export default SearchField;
