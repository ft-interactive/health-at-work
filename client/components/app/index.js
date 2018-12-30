import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './select';
import InputRange from './input-range';
import Button from './button';
import Copy from './copy';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incomeSelected: false,
      submitted: false,
      submitButtonText: 'Read article',
      inputValues: {
        income: '-',
        daysGuess: 25,
      },
      renderValues: {
        data: [],
        income: '',
        daysGuess: 25,
        rightWrong: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize);
  }

  handleChange(event) {
    this.setState({
      incomeSelected: true,
      inputValues: {
        income: event.target.value,
        daysGuess: this.state.inputValues.daysGuess,
      },
    });
  }

  handleDaysChange(event) {
    const inputValue = parseInt(event.target.value, 10);
    const number = isNaN(inputValue) ? 25 : inputValue;
    const rangeEl = document.querySelector('input[type=range]');
    const rangeWidth = rangeEl.clientWidth - 30; // Width of range input minus width of thumb including border
    const rangeProgress = number / 50;
    const outputEl = document.querySelector('.range-input output');
    const offset = 14; // Half width of thumb excluding border
    let outputLeft;

    if (rangeProgress < 0) {
      outputLeft = 0;
    } else if (rangeProgress > 1) {
      outputLeft = rangeWidth;
    } else {
      outputLeft = (rangeWidth * rangeProgress) + offset;
    }

    outputEl.style.left = `${outputLeft}px`;

    this.setState({
      inputValues: {
        income: this.state.inputValues.income,
        daysGuess: number,
      },
    });
    // console.log(rangeWidth, rangeProgress, outputLeft, offset);
  }

  handleSubmit(event) {
    const filteredData = this.props.data.filter(d => d.income === this.state.inputValues.income);
    const income = this.state.inputValues.income;
    const daysGuess = this.state.inputValues.daysGuess;
    let rightWrong = this.state.renderValues.rightWrong;

    event.preventDefault();

    if (daysGuess > Math.round(filteredData[0].absence.days)) {
      rightWrong = 'The actual number is lower';
    } else if (daysGuess < Math.round(filteredData[0].absence.days)) {
      rightWrong = 'The actual number is higher';
    } else {
      rightWrong = 'You are correct';
    }

    this.setState({
      submitted: true,
      submitButtonText: 'Refresh article',
      renderValues: {
        data: filteredData[0],
        income,
        daysGuess,
        rightWrong,
      },
    });
  }

  handleResize() {
    const rangeEl = document.querySelector('input[type=range]');
    const rangeWidth = rangeEl.clientWidth - 30; // Width of range input minus width of thumb including border
    const rangeProgress = this.state.inputValues.daysGuess / 50;
    const outputEl = document.querySelector('.range-input output');
    const offset = 14; // Half width of thumb excluding border
    let outputLeft;

    if (rangeProgress < 0) {
      outputLeft = 0;
    } else if (rangeProgress > 1) {
      outputLeft = rangeWidth;
    } else {
      outputLeft = (rangeWidth * rangeProgress) + offset;
    }

    outputEl.style.left = `${outputLeft}px`;
    // console.log(rangeWidth, rangeProgress, outputLeft, offset);
  }

  render() {
    const renderData = this.state.submitted ? this.state.renderValues.data : this.props.data[0];

    return (
      <div>
        <Select
          data={this.props.data}
          value={this.state.inputValues.income}
          onChange={this.handleChange}
        />

        <InputRange
          value={this.state.inputValues.daysGuess}
          onChange={this.handleDaysChange}
          disabled={!this.state.incomeSelected}
        />

        <Button
          value={this.state.submitButtonText}
          onClick={this.handleSubmit}
          disabled={!this.state.incomeSelected}
          submitted={this.state.submitted}
        />

        <Copy
          data={renderData}
          guess={this.state.renderValues.daysGuess}
          rightWrong={this.state.renderValues.rightWrong}
          submitted={this.state.submitted}
        />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
};

export default App;
