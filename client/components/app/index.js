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
      ageSelected: false,
      submitted: false,
      submitButtonText: 'Read article',
      inputValues: {
        age: '-',
        daysGuess: 25,
      },
      renderValues: {
        data: [],
        age: '',
        daysGuess: 25,
        rightWrong: '',
      },
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResize = this.handleResize.bind(this);
    // console.log(props.data);
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize);
  }

  handleSelectChange(event) {
    this.setState({
      ageSelected: true,
      inputValues: {
        ...this.state.inputValues,
        age: event.target.value,
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
        age: this.state.inputValues.age,
        daysGuess: number,
      },
    });
    // console.log(rangeWidth, rangeProgress, outputLeft, offset);
  }

  handleSubmit(event) {
    const filteredData = this.props.data.filter(d => d.age === this.state.inputValues.age);
    const { age, daysGuess } = this.state.inputValues;
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
        age,
        daysGuess,
        rightWrong,
      },
    });
  }

  handleResize() {
    // Reposition range slider output element
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
    const averages = this.props.data.filter(d => d.age.toLowerCase() === 'average')[0];

    return (
      <div>
        <section className="o-forms">
          <Select
            data={this.props.data}
            value={this.state.inputValues.age}
            onChange={this.handleSelectChange}
          />

          <InputRange
            value={this.state.inputValues.daysGuess}
            onChange={this.handleDaysChange}
            disabled={!this.state.ageSelected}
          />

          <Button
            value={this.state.submitButtonText}
            onClick={this.handleSubmit}
            disabled={!this.state.ageSelected}
            submitted={this.state.submitted}
          />
        </section>

        <Copy
          data={renderData}
          guess={this.state.renderValues.daysGuess}
          rightWrong={this.state.renderValues.rightWrong}
          submitted={this.state.submitted}
          averages={averages}
        />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default App;
