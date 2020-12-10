import React from "react";
import "./dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'

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

  render() {
    return (
      <div className="dropdown colorMenu">
        <button className="dropbtn"><FontAwesomeIcon icon={faPalette} size="2x" /></button>
        <div className="dropdown-content">
          <button 
            onClick={this.props.setColor.bind(this, this.props.currentList, 0 )}
            style={{ 
              display: "inline-block",
              backgroundColor: "#cc5252",
              width: "24px",
              height: "24px",
              margin: "4px",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer"
            }} 
            />
          <button 
            onClick={this.props.setColor.bind(this, this.props.currentList, 1 )}
            style={{ 
              display: "inline-block",
              backgroundColor: "blue",
              width: "24px",
              height: "24px",
              margin: "4px",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer"
            }} 
          />
          <button 
            onClick={this.props.setColor.bind(this, this.props.currentList, 2 )}
            style={{ 
              display: "inline-block",
              backgroundColor: "green",
              width: "24px",
              height: "24px",
              margin: "4px",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer"
            }} 
          />
          <button 
            onClick={this.props.setColor.bind(this, this.props.currentList, 3 )}
            style={{ 
              display: "inline-block",
              backgroundColor: "darkviolet",
              width: "24px",
              height: "24px",
              margin: "4px",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer"
            }} 
          />
          <button 
            onClick={this.props.setColor.bind(this, this.props.currentList, 4 )}
            style={{ 
              display: "inline-block",
              backgroundColor: "#333",
              width: "24px",
              height: "24px",
              margin: "4px",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer"
            }} 
          />
        </div>
    </div> 
    )
  }
}

export default FilterMenu