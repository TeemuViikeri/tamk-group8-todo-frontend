import React, { Component } from "react";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class DateMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <div className="App">
        <SingleDatePicker
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={date => this.props.setTodoDeadline(this.props.todoId, date)} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id="your_unique_id" // PropTypes.string.isRequired,
        />
      </div>
    );
  }
}

export default DateMenu;
