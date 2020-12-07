import React, { Component } from "react";
import TextInputField from "./TextInputField";

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  getFormStyle = () => {
    return {
      display: "inline-block", 
      lineHeight: "36px",
      position: "relative",
      flex: "1",
      bottom: "10px"
    }
  }

  render() {
    return (
          <form style={this.getFormStyle()}>
            <TextInputField
              title={this.state.title} 
              placeholder="Search task"
              padding="8px"
              flex="6"
              btnText="Find"
              borderBottom="none"
            />
          </form>
    )
  }
}

export default SearchField;
