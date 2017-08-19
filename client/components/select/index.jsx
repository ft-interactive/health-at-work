import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      income: '[select your income range]',
      changed: false,
    };

    console.log(props.data);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      income: event.target.value,
      changed: true,
    });
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
    const selectIncome = (
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

    const selectDays = (
      <label htmlFor="select-days">
        {/* eslint-disable max-len */}
        “I think {this.state.income} companies lose {0} days of productive time per employee per year due to health issues.”
        {/* eslint-enable max-len */}
      </label>
    );

    const article = this.state.changed ? (
      <section>
        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          You guessed <span className="variable">{0}</span> days. But the real number is <span className="variable">{'higher'}</span> — <span className="variable">{this.state.income}</span> companies lost <span className="variable">{0}</span> employee days per year due to health reasons, according to a RAND report commissioned for the Financial Times.
          {/* eslint-enable max-len */}
        </p>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          The most serious issue in the <span className="variable">{this.state.income}</span> industry is <span className="variable">{'TK'}</span> — <span className="variable">{`0 per cent`}</span> of employees in the sector are classed as “physically inactive”, meaning that they TK.
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
      <div className="spacer"></div>
    );

    return (
      <div>
        <form>
          {selectIncome}<br />
          {selectDays}
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
