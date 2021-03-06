import React, { Component } from "react";
import ListItem from "./ListItem";
import ListInputField from "./ListInputField";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import "../todo/css/todoWrapper.css"

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
    };
  }

  getSideMenuStyle = () => {
    return {
      width: "0rem",
      height: "100vh",
      flex: "initial",
      display: "flex",
      flexDirection: "column",
      backgroundColor: this.props.palette.bgSecondary, 
    };
  };

  getSideMenuHeaderStyle = () => {
    return {
      textAlign: "left",
      padding: "0.9375rem 1.25rem",
      backgroundColor: this.props.palette.secondary,
      height: "4.5rem",
      color: this.props.palette.fillHeaderColor,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
  };

  getSideMenuFooterStyle = () => {
    return {
      backgroundColor: this.props.palette.secondary,
      lineHeight: "2.1875rem",
      height: "4.0625rem",
      width: "100%",
    };
  };

  render() {
    return (
      <div id="sideMenu" style={this.getSideMenuStyle()}>
        <h1 style={this.getSideMenuHeaderStyle()}>
          <span>Lists</span>
          <FontAwesomeIcon 
            id="list-arrow" 
            icon={faArrowLeft} 
            size="lg" 
            style={{ paddingRight: "1rem", cursor: "pointer" }} 
            onClick={this.props.closeSideMenu}
          />
        </h1>

        <div style={{ marginTop: "0.9375rem", minHeight: 0, flexGrow: "1", overflowY: "auto"}}>
          {this.props.lists.map((list) => {
            return (
              <ListItem
                id={list.id}
                key={list.id}
                list={list}
                deleteList={this.props.deleteList}
                setList={this.props.setList}
                editList={this.props.editList}
                currentList={this.props.currentList}
                palette={this.props.palette}
              />
            );
          })}
        </div>

        <div style={this.getSideMenuFooterStyle()}>
          <ListInputField addList={this.props.addList} palette={this.props.palette} />
        </div>
      </div>
    );
  }
}

export default SideMenu;
