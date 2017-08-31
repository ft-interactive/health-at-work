import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      incomeSelected: false,
      submitted: false,
      submitButtonText: 'Read article',
      inputs: {
        income: '[select your income range]',
        daysGuess: 25,
        rightWrong: '',
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

    console.log(props.data);
  }

  handleChange(event) {
    this.setState({
      incomeSelected: true,
      inputs: {
        income: event.target.value,
        daysGuess: 25,
        rightWrong: '',
      },
    });
  }

  handleDaysChange(event) {
    const inputValue = parseInt(event.target.value, 10);
    const number = isNaN(inputValue) ? 50 / 2 : inputValue;

    this.setState({
      inputs: {
        income: this.state.inputs.income,
        daysGuess: number,
        rightWrong: '',
      },
    });
  }

  handleSubmit(event) {
    const filteredData = this.props.data.filter(d => d.income === this.state.inputs.income);
    const income = this.state.inputs.income;
    const daysGuess = this.state.inputs.daysGuess;
    let rightWrong;

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
      render: {
        data: filteredData[0],
        income,
        daysGuess,
        rightWrong,
      },
    });
  }

  render() {
    const data = this.state.render.data;
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
          value={this.state.inputs.income}
          onChange={this.handleChange}
          id="select-income"
        >
          <option
            value={this.state.inputs.income}
            disabled
          >
            {this.state.inputs.income}
          </option>

          {incomeOptions}
        </select>

        &nbsp;income range.”
      </label>
    );
    const daysRange = (
      <label htmlFor="select-days">
        “I think {this.state.inputs.income} companies lose&nbsp;

        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={this.state.inputs.daysGuess}
          onChange={this.handleDaysChange}
          disabled={!this.state.incomeSelected}
        />

        <output>
          {this.state.inputs.daysGuess}
        </output>

        &nbsp;days of productive time per employee per year due to health issues.”
      </label>
    );
    const submitButton = (
      <input
        type="submit"
        value={this.state.submitButtonText}
        disabled={!this.state.incomeSelected}
        className="o-buttons o-buttons--big o-buttons--standout"
        id="submit-button"
      />
    );
    const article = this.state.incomeSelected && this.state.submitted ? (
      <section>
        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          You guessed <span className="variable">{this.state.render.daysGuess}</span> days. {this.state.render.rightWrong} — employees earning <span className="variable">{this.state.render.income}</span> missed an average of <span className="variable">{data.absence.days}</span> days of work per year due to health reasons, according to a RAND report commissioned for the Financial Times.
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
          <span className="variable">{data.physicallyinactivepc}</span> per cent of employees earning <span className="variable">{this.state.render.income}</span> are physically inactive, meaning that they get less than 150 minutes of activity per week; this compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Nutrition</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{data.fruitvegpc}</span> per cent of employees earning <span className="variable">{this.state.render.income}</span> do not eat at least five portions of fruit and vegetables per day. This compares to [TKTKT] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Smoking</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{data.smokepc}</span> per cent of employees earning <span className="variable">{this.state.render.income}</span> smoke. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Sleep deprivation</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{data.sleeppc}</span> per cent of employees sleep less than seven hours per night. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Obesity</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{data.obesepc}</span> per cent of employees earning <span className="variable">{this.state.render.income}</span> are classed as obese, meaning that they have a body mass index of 30 or higher. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>. **BMI calculator here?**
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Musculoskeletal conditions</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{data.twomscondspc}</span> per cent of employees have two or more musculoskeletal conditions. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Mental health</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{data.depressionpc}</span> per cent of employees earning <span className="variable">{this.state.render.income}</span> suffer from depression. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Financial concerns</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{data.finconcernspc}</span> per cent of employees earning <span className="variable">{this.state.render.income}</span> have financial concerns. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Stress</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          Employees earning <span className="variable">{this.state.render.income}</span> have an average of <span className="variable">{data.stressdimensions}</span> “work-related stress dimensions”, according the the Health and Safety Executive scale, meaning [TKTK], and <span className="variable">{data.twoplusstressdimensions}</span> per cent of employees have two or more stress dimensions. By contrast, employees across all sectors in the UK have an average of [TKTK] work-related stress dimensions, and [TKTK] per cent of all employees in the UK have two or more work related stress dimensions. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer">link to the story</a>.
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
