import React, { Component } from "react";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class DateMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateDisplay: null,
    };
  }
  
  dateHandler = () => {
    if (typeof this.props.deadline === "string") {
      this.state.dateDisplay = new Date(this.props.deadline)
    } else {
      this.state.dateDisplay = null
    }
  }

  dateAssembler = () => {
    if (!isNaN(this.state.dateDisplay.getFullYear())) {
      return `${this.state.dateDisplay.getFullYear()}-${this.state.dateDisplay.getMonth()}-${this.state.dateDisplay.getDate()}`;
    } else {
      return "";
    }
  }

  render() {
    this.dateHandler();
    return (
      !this.props.isDateEditing ?
        <div>{this.dateAssembler()}</div>
      : // Else
        <div className="App">
          <SingleDatePicker
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.props.stopDateEditing(date)} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
          />
        </div>
    );
  }
}

export default DateMenu;
