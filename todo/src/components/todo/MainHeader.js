import React, { Component } from "react";
import SearchField from "./SearchField";
import SideMenuButton from "./SideMenuButton";
import ColorMenu from "./ColorMenu";
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
      flex: this.props.flex,
      height: "4.5rem",
      color: this.props.palette.fillHeaderColor,
      backgroundColor: this.props.palette.primary,
      padding: "0.9375rem 1.25rem",
      textAlign: "left",
    };
  };

  render() {
    return (
      <header style={this.getMainHeaderStyle()}>
        <SideMenuButton 
          flex="1"
          openSideMenu={this.props.openSideMenu}
          closeSideMenu={this.props.closeSideMenu}
        />
        <h1 style={{flex: "3", textAlign: "center", 
                    textOverflow: "ellipsis", overflow: "hidden"}}>
          {this.state.name}
        </h1>
        <div 
          className="widget-container" 
          style={{display: "flex", flexDirection: "row", flex: "1", alignItems: "center"}}
        >
          <SearchField palette={this.props.palette} handleOnKeyUp={this.props.handleOnKeyUp} searchTasks={this.props.searchTasks} lists={this.props.lists} />
          <ColorMenu setColor={this.props.setColor} currentList={this.props.currentList} palette={this.props.palette} />
          <SortMenu setOrderTasks={this.props.setOrderTasks} />
          <FilterMenu setDeadlineFilter={this.props.setDeadlineFilter} />
        </div>
      </header>
    );
  }
}

export default MainHeader;
