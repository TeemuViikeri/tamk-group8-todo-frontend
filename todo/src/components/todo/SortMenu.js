import React from "react";
import "./dropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons'

class SortMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
    };
  }

  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn"><FontAwesomeIcon icon={faSortAmountUpAlt} size="2x" /></button>
        <div className="dropdown-content">
          <button onClick={this.props.setOrderTasks.bind(this, "+created")}>Created ascending</button>
          <button onClick={this.props.setOrderTasks.bind(this, "-created")}>Created descending</button>
          <button onClick={this.props.setOrderTasks.bind(this, "+edited")}>Edited ascending</button>
          <button onClick={this.props.setOrderTasks.bind(this, "-edited")}>Edited descending</button>
          <button onClick={this.props.setOrderTasks.bind(this, "+priority")}>Priority ascending</button>
          <button onClick={this.props.setOrderTasks.bind(this, "-priority")}>Priority descending</button>
          <button onClick={this.props.setOrderTasks.bind(this, "+deadline")}>Deadline ascending</button>
          <button onClick={this.props.setOrderTasks.bind(this, "-deadline")}>Deadline descending</button>
        </div>
    </div> 
    )
  }
}

export default SortMenu