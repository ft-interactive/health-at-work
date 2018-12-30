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
      inputs: {
        income: '-',
        daysGuess: 25,
      },
      render: {
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
      inputs: {
        income: event.target.value,
        daysGuess: this.state.inputs.daysGuess,
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
      inputs: {
        income: this.state.inputs.income,
        daysGuess: number,
      },
    });
    // console.log(rangeWidth, rangeProgress, outputLeft, offset);
  }

  handleSubmit(event) {
    const filteredData = this.props.data.filter(d => d.income === this.state.inputs.income);
    const income = this.state.inputs.income;
    const daysGuess = this.state.inputs.daysGuess;
    let rightWrong = this.state.render.rightWrong;

    event.preventDefault();

    if (daysGuess > Math.round(filteredData[0].absence.days)) {
      rightWrong = 'The actual number is lower';
    } else if (daysGuess < Math.round(filteredData[0].absence.days)) {
      rightWrong = 'The actual number is higher';
    } else {
      rightWrong = 'You are correct';
    }

    console.log(rightWrong, filteredData[0].absence.days);

    this.setState({
      submitted: true,
      submitButtonText: 'Refresh article',
      render: {
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
    const rangeProgress = this.state.inputs.daysGuess / 50;
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
    const renderData = this.state.submitted ? this.state.render.data : this.props.data[0];

    return (
      <div>
        <Select
          data={this.props.data}
          value={this.state.inputs.income}
          onChange={this.handleChange}
        />

        <InputRange
          value={this.state.inputs.daysGuess}
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
          guess={this.state.render.daysGuess}
          rightWrong={this.state.render.rightWrong}
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
