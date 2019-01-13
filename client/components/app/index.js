import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './select';
import InputRange from './input-range';
import Button from './button';
import responsiveGraphicsWrapper from '../hocs/responsive-graphics-wrapper';
import Chart from './chart';
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
    const filteredData = this.props.data.find(d => d.age === this.state.inputValues.age); // TODO: use .find()
    const { age, daysGuess } = this.state.inputValues;
    let rightWrong = this.state.renderValues.rightWrong;

    event.preventDefault();

    if (daysGuess > Math.round(filteredData.absence.days)) {
      rightWrong = 'The actual number is lower';
    } else if (daysGuess < Math.round(filteredData.absence.days)) {
      rightWrong = 'The actual number is higher';
    } else {
      rightWrong = 'You are correct';
    }

    this.setState({
      submitted: true,
      submitButtonText: 'Refresh article',
      renderValues: {
        data: filteredData,
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
    const { ageSelected, submitted, submitButtonText, inputValues, renderValues } = this.state;
    const { handleSelectChange, handleDaysChange, handleSubmit } = this;
    const { data } = this.props;
    const renderData = submitted ? renderValues.data : data[0];
    const ResponsiveChart = responsiveGraphicsWrapper(Chart);
    const averages = data.filter(d => d.age.toLowerCase() === 'average')[0];
    let className = 'copy';
    if (!submitted) className += ' blurred';

    return (
      <div>
        <section className="o-forms">
          <Select
            data={data}
            value={inputValues.age}
            onChange={handleSelectChange}
          />

          <InputRange
            value={inputValues.daysGuess}
            onChange={handleDaysChange}
            disabled={!ageSelected}
          />

          <Button
            value={submitButtonText}
            onClick={handleSubmit}
            disabled={!ageSelected}
            submitted={submitted}
          />
        </section>

        <section className={className}>
          <p className="o-typography-body">
            {/* eslint-disable max-len */}
            You guessed {renderValues.daysGuess} days. {renderValues.rightWrong || 'You are correct'}: employees aged {renderData.age} lose <span className="variable">{(submitted && renderData.absence.days) || renderValues.daysGuess}</span> days per year because of absenteeism and presenteeism, according to a survey developed by VitalityHealth and produced in association with Rand Europe, the Financial Times, the University of Cambridge and Healthy Workplace, a joint venture between Vitality and Nuffield Health.
            {/* eslint-enable max-len */}
          </p>
        </section>

        {submitted &&
          <ResponsiveChart
            data={data}
            highlighted={submitted && renderData.age}
          />
        }

        <Copy
          data={renderData}
          guess={renderValues.daysGuess}
          rightWrong={renderValues.rightWrong}
          submitted={submitted}
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
