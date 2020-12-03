import React, { Component } from "react";
import SearchField from "./SearchField";
import SideMenuButton from "./SideMenuButton";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";

class MainHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({ name: this.props.name })
    }
  }

  getMainHeaderStyle = () => {
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "72px",
      lineHeight: "36px",
      color: "white",
      background: "#cc5252",
      padding: "15px 20px",
      textAlign: "left",
    };
  };

  render() {
    return (
      <header style={this.getMainHeaderStyle()}>
        <SideMenuButton flex="1"/>
        <h1 style={{flex: "1", textAlign: "center"}}>{this.state.name}</h1>
        <div className="widget-container" style={{display: "flex", flexDirection: "row", justifyContent: "space-between", flex: "1"}}>
          <SearchField />
          <SortMenu setOrderTasks={this.props.setOrderTasks} />
          <FilterMenu setDeadlineFilter={this.props.setDeadlineFilter} />
        </div>
      </header>
    );
  }
}

export default MainHeader;
