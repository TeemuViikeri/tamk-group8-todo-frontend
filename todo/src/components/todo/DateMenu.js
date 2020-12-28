import React, { Component } from "react";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faClock } from '@fortawesome/free-solid-svg-icons'

class DateMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateDisplay: new Date(this.props.deadline)
    };
  }
  
  componentDidUpdate(prevProps) { 
    if (this.props.deadline !== prevProps.deadline) {
      this.setState({ dateDisplay: new Date(this.props.deadline) })
    }
  }

  dateAssembler = () => {
    if (!isNaN(this.state.dateDisplay.getFullYear()) && this.props.deadline !== null) {
      const year = this.state.dateDisplay.getFullYear()
      const month = this.state.dateDisplay.toLocaleString('default', { month: 'short' });
      const day = this.state.dateDisplay.getDate()

      return (
        <span style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "auto"}}>
          <FontAwesomeIcon icon={faClock} style={{ color: this.props.palette.primary}} />&nbsp;
          <time dateTime={this.state.dateDisplay} style={{ fontStyle: "italic"}}>
            {month}&nbsp;{day}, {year}
          </time>&nbsp;
          {this.deleteDeadline()}
        </span>
      )
    } else {
      return "";
    }
  }

  deleteDeadline = () => {
    if (this.props.deadline !== "0000-00-00" && this.props.deadline !== null) {
      return <button
          onClick={this.props.setTodoDeadlineNull.bind(this, this.props.todoId)}
          style={this.props.getButtonStyle()}
        >
          <FontAwesomeIcon icon={faEraser} />
        </button>
    }
  }

  render() {
    const onSmallDevice = window.matchMedia('(max-width: 767px)').matches
    const orientation = onSmallDevice ? "vertical" : "horizontal";

    return (
      !this.props.isDateEditing ?
        <div style={{marginTop: "0.5rem"}}>
          {this.dateAssembler()}

        </div>
      : // Else
        <div style={{marginTop: "0.5rem", display: "flex", alignItems: "center"}}>
          <SingleDatePicker
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.props.stopDateEditing(date)} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id={`date-picker-${this.props.todoId}`} // PropTypes.string.isRequired
            small={true}
            hideKeyboardShortcutsPanel={true}
            withPortal={true}
            orientation={orientation}
            firstDayOfWeek={1}
          />
          <span 
            onClick={e => this.props.stopDateEditing()} 
            style={{padding: "0.4375rem", border: "none", marginLeft: "0.25rem", color: this.props.palette.fillClearButton, cursor: "pointer", fontSize: "1.5rem", position: "relative", bottom: "0.25rem"}}
          >
            &times;
          </span>
        </div>
    );
  }
}

export default DateMenu;
