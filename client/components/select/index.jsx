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
    };
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

    this.setState({
      submitted: true,
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
        value="Read article"
        disabled={!this.state.selectionMade}
        className="o-buttons o-buttons--big o-buttons--standout"
      />
    );
    const article = this.state.selectionMade && this.state.submitted ? (
      <section>
        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          You guessed <span className="variable">{this.state.daysGuess}</span> days. But the real number is <span className="variable">{'higher'}</span> — <span className="variable">{this.state.income}</span> companies lost <span className="variable">{this.state.data.absence.days}</span> employee days per year due to health reasons, according to a RAND report commissioned for the Financial Times.
          {/* eslint-enable max-len */}
        </p>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          The most serious issue for employees in this salary range is <span className="variable">{'TK'}</span> — <span className="variable">{'0 per cent'}</span> of employees in the sector are classed as “physically inactive”, meaning that they TK.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Physical activity</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          {0} per cent of employees are physically inactive, meaning that they get less than 150 minutes of activity per week; this compares to {0} per cent of all employees in the UK. Sentence here providing a link to the story.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Nutrition</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          {0} per cent of employees do not eat at least five portions of fruit and vegetables per day. This compares to {0} per cent of all employees in the UK. Sentence here providing a link to the story.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Smoking</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          {0} per cent of employees smoke. This compares to {0} per cent of all employees in the UK. Sentence here providing a link to the story.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Sleep deprivation</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          {0} per cent of employees sleep less than seven hours per night. This compares to {0} per cent of all employees in the UK. Sentence here providing a link to the story.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Obesity</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          {0} per cent of employees are classed as obese, meaning that they have a body mass index of 30 or higher. This compares to {0} per cent of all employees in the UK. Sentence here providing a link to the story. **BMI calculator here?**
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Musculoskeletal conditions</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          {0} per cent of employees have two or more musculoskeletal conditions. This compares to {0} per cent of all employees in the UK. Sentence here providing a link to the story.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Mental health</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          {0} per cent of employees suffer from depression. This compares to {0} per cent of all employees in the UK. Sentence here providing a link to the story.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Financial concerns</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          {0} per cent of employees have financial concerns. This compares to {0} per cent of all employees in the UK. Sentence here providing a link to the story.
          {/* eslint-enable max-len */}
        </p>

        <h2 className="o-typography-heading-level-2">Stress</h2>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          Employees have an average of {0} “work-related stress dimensions”, according the the Health and Safelty Executive scale, meaning TK TK TK, and {0} per cent of employees have two or more stress dimensions. By contrast, employees across all sectors in the UK have an average of {0} work-related stress dimensions, and {0} per cent of all employees in the UK have two or more work related stress dimensions. Sentence here providing a link to the story.
          {/* eslint-enable max-len */}
        </p>
      </section>
    ) : (
      <div className="spacer" />
    );

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {incomeSelect}<br />

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
