import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      selectionMade: false,
      income: '[select your income range]',
      daysGuess: 25,
      submitted: false,
      submitButtonText: 'Read article',
    };
    this.rightWrong = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(props.data);
  }

  handleChange(event) {
    const filteredData = this.props.data.filter(d => d.income === event.target.value);

    this.setState({
      data: filteredData[0],
      selectionMade: true,
      income: event.target.value,
    });
  }

  handleDaysChange(event) {
    const inputValue = parseInt(event.target.value, 10);
    const number = isNaN(inputValue) ? 50 / 2 : inputValue;

    this.setState({ daysGuess: number });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.daysGuess > Math.round(this.state.data.absence.days)) {
      this.rightWrong = 'The actual number is lower';
    } else if (this.state.daysGuess < Math.round(this.state.data.absence.days)) {
      this.rightWrong = 'The actual number is higher';
    } else {
      this.rightWrong = 'You are correct';
    }

    this.setState({
      submitted: true,
      submitButtonText: 'Refresh article',
    });

    console.log(this.state.data);
  }

  render() {
    const incomeOptions = this.props.data.map(d => (
      <option
        key={`income${d.rank}`}
        value={d.income}
      >
        {d.income}
      </option>
    ));
    const incomeSelect = (
      <label htmlFor="select-income">
        “I am in the&nbsp;

        <select
          value={this.state.income}
          onChange={this.handleChange}
          id="select-income"
        >
          <option
            value={this.state.income}
            disabled
          >
            {this.state.income}
          </option>

          {incomeOptions}
        </select>

        &nbsp;income range.”
      </label>
    );
    const daysRange = (
      <label htmlFor="select-days">
        “I think {this.state.income} companies lose&nbsp;

        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={this.state.daysGuess}
          onChange={this.handleDaysChange}
          disabled={!this.state.selectionMade}
        />

        <output>
          {this.state.daysGuess}
        </output>

        &nbsp;days of productive time per employee per year due to health issues.”
      </label>
    );
    const submitButton = (
      <input
        type="submit"
        value={this.state.submitButtonText}
        disabled={!this.state.selectionMade}
        className="o-buttons o-buttons--big o-buttons--standout"
        id="submit-button"
      />
    );
    const article = this.state.selectionMade && this.state.submitted ? (
      <section>
        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          You guessed <span className="variable">{this.state.daysGuess}</span> days. {this.rightWrong} — employees earning <span className="variable">{this.state.income}</span> missed an average of <span className="variable">{this.state.data.absence.days}</span> days of work per year due to health reasons, according to a RAND report commissioned for the Financial Times.
          {/* eslint-enable max-len */}
        </p>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          The most serious issue for employees in this salary range is <span className="variable">{'TK'}</span>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Physical activity</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{this.state.data.physicallyinactivepc}</span> per cent of employees earning <span className="variable">{this.state.income}</span> are physically inactive, meaning that they get less than 150 minutes of activity per week; this compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Nutrition</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{this.state.data.fruitvegpc}</span> per cent of employees earning <span className="variable">{this.state.income}</span> do not eat at least five portions of fruit and vegetables per day. This compares to [TKTKT] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Smoking</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{this.state.data.smokepc}</span> per cent of employees earning <span className="variable">{this.state.income}</span> smoke. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Sleep deprivation</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{this.state.data.sleeppc}</span> per cent of employees sleep less than seven hours per night. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Obesity</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{this.state.data.obesepc}</span> per cent of employees earning <span className="variable">{this.state.income}</span> are classed as obese, meaning that they have a body mass index of 30 or higher. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>. **BMI calculator here?**
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Musculoskeletal conditions</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{this.state.data.twomscondspc}</span> per cent of employees have two or more musculoskeletal conditions. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Mental health</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{this.state.data.depressionpc}</span> per cent of employees earning <span className="variable">{this.state.income}</span> suffer from depression. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Financial concerns</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{this.state.data.finconcernspc}</span> per cent of employees earning <span className="variable">{this.state.income}</span> have financial concerns. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Stress</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          Employees earning <span className="variable">{this.state.income}</span> have an average of <span className="variable">{this.state.data.stressdimensions}</span> “work-related stress dimensions”, according the the Health and Safety Executive scale, meaning [TKTK], and <span className="variable">{this.state.data.twoplusstressdimensions}</span> per cent of employees have two or more stress dimensions. By contrast, employees across all sectors in the UK have an average of [TKTK] work-related stress dimensions, and [TKTK] per cent of all employees in the UK have two or more work related stress dimensions. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>
      </section>
    ) : <div className="spacer" />;

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="form-select"
        >
          {incomeSelect}

          {daysRange}

          {submitButton}
        </form>

        {article}
      </div>
    );
  }
}

Select.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
};

export default Select;
