import React from "react";
import "./dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

class FilterMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  getSubmenuStyle = () => {
    return {
      position: "absolute",
      backgroundColor: "#f9f9f9",
      minWidth: "160px",
      boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
      zIndex: 1,
    };
  };

  getMenuStyle = () => {
    return {
      float: "right",
    };
  };

  render() {
    return (
      <div className="dropdown">
      <button className="dropbtn"><FontAwesomeIcon icon={faFilter} size="2x" /></button>
      <div className="dropdown-content">
        <button onClick={this.props.setDeadlineFilter.bind(this, "")}>Show all</button>
        <button onClick={this.props.setDeadlineFilter.bind(this, "!null")}>Show tasks with deadlines</button>
        <button onClick={this.props.setDeadlineFilter.bind(this, "NULL")}>Show tasks without deadlines</button>
      </div>
    </div> 
    )
  }
}

export default FilterMenu