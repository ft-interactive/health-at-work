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
    const renderData = this.state.render.data;
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
    const article = (
      <section className={!this.state.submitted && 'blurred'}>
        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          You guessed <span className="variable">{this.state.render.daysGuess}</span> days. {this.state.render.rightWrong || 'You are correct'} — employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> missed an average of <span className="variable">{(this.state.submitted && renderData.absence.days) || this.state.render.daysGuess}</span> days of work per year due to health reasons, according to a RAND report commissioned for the Financial Times.
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
          <span className="variable">{renderData.physicallyinactivepc || this.state.data[0].physicallyinactivepc}</span> per cent of employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> are physically inactive, meaning that they get less than 150 minutes of activity per week; this compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Nutrition</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{renderData.fruitvegpc || this.state.data[0].fruitvegpc}</span> per cent of employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> do not eat at least five portions of fruit and vegetables per day. This compares to [TKTKT] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Smoking</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{renderData.smokepc || this.state.data[0].smokepc}</span> per cent of employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> smoke. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Sleep deprivation</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{renderData.sleeppc || this.state.data[0].sleeppc}</span> per cent of employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> sleep less than seven hours per night. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Obesity</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{renderData.obesepc || this.state.data[0].obesepc}</span> per cent of employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> are classed as obese, meaning that they have a body mass index of 30 or higher. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Musculoskeletal conditions</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{renderData.twomscondspc || this.state.data[0].twomscondspc}</span> per cent of employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> have two or more musculoskeletal conditions. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Mental health</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{renderData.depressionpc || this.state.data[0].depressionpc}</span> per cent of employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> suffer from depression. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Financial concerns</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          <span className="variable">{renderData.finconcernspc || this.state.data[0].finconcernspc}</span> per cent of employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> have financial concerns. This compares to [TKTK] per cent of all employees in the UK. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Stress</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          Employees earning <span className="variable">{this.state.render.income || this.state.data[0].income}</span> have an average of <span className="variable">{renderData.stressdimensions || this.state.data[0].stressdimensions}</span> “work-related stress dimensions”, according the the Health and Safety Executive scale, meaning [TKTK], and <span className="variable">{renderData.twoplusstressdimensions || this.state.data[0].twoplusstressdimensions}</span> per cent of employees have two or more stress dimensions. By contrast, employees across all sectors in the UK have an average of [TKTK] work-related stress dimensions, and [TKTK] per cent of all employees in the UK have two or more work related stress dimensions. Sentence here providing a <a href="https://ft.com" target="_blank" rel="noopener noreferrer" className="o-typography-link">link to the story</a>.
          {/* eslint-enable max-len */}
        </p>
      </section>
    );

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
