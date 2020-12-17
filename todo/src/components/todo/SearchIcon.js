import React, { Component } from "react";

class SearchIcon extends Component {
  getSearchIconStyle = () => {
    return {
      display: "inline-block",
      fontSize: "1.25rem",
      marginLeft: "0.3125rem",
      // marginRight: "5px",
      verticalAlign: "0.25em"
    }
  };

  render() {
    return <span style={this.getSearchIconStyle()}>&#x1F50E;</span>
  }
}

export default SearchIcon;
