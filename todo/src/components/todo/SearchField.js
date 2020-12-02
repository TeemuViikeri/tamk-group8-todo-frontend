import React, { Component } from "react";
import TextInput from "./TextInput";

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
    }
  }

  render() {
    return (
          <form style={this.getFormStyle()}>
            <TextInput 
              title={this.state.title} 
              // onChange={this.onChange} 
              placeholder="Search task"
              padding="10px"
              flex="1"
            />
          </form>
    )
  }
}

export default SearchField;
