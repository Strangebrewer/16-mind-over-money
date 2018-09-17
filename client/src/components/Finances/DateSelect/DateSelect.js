import React from "react";
import { Outer } from "../../Elements/Containers";
import { FormBtn } from "../../Elements/Form";
import "./DateSelect.css";

class DateSelect extends React.Component {
  state = {
    month: "",
    year: ""
  }

  componentDidMount() {
    this.setState({
      month: this.props.month,
      year: this.props.year
    })
  }

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { month, year } = this.state;

    return (
      <Outer addedClass="date-select">
        <div className="month-select">
          <select name="month" onChange={this.handleInputChange}>
            <option>{this.state.month.toUpperCase()}</option>
            <option value="Jan">JAN</option>
            <option value="Feb">FEB</option>
            <option value="Mar">MAR</option>
            <option value="Apr">APR</option>
            <option value="May">MAY</option>
            <option value="Jun">JUN</option>
            <option value="Jul">JUL</option>
            <option value="Aug">AUG</option>
            <option value="Sep">SEP</option>
            <option value="Oct">OCT</option>
            <option value="Nov">NOV</option>
            <option value="Dec">DEC</option>
          </select>
        </div>
        <div className="year-select">
          <select name="year" onChange={this.handleInputChange}>
            <option>{this.state.year}</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
        <div className="date-select-btn">
          <FormBtn
            onClick={() => this.props.handleDateChange(month, year)}
            value="Go!"
          />
        </div>
      </Outer>
    )
  }
};

export default DateSelect;