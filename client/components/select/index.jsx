import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'default',
      changed: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      sector: event.target.value,
      changed: true,
    });
  }

  render() {
    const selectSector = (
      <label htmlFor="select">
        Which sector do you work in?

        <select
          value={this.state.value}
          onChange={this.handleChange}
          id="select"
        >
          <option value="default" disabled>Choose your sector</option>
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
          <option value="baz">Baz</option>
        </select>
      </label>
    );

    const selectDays = (
      null
    );

    const article = this.state.changed ? (
      <section>
        <p className="o-typography-body">
          {/* eslint-disable */}
          You guessed {0} days. But the real number is {0} — {this.state.sector} employees lost {0} days per year due to health reasons, according to a RAND report commissioned for the Financial Times.
          {/* eslint-enable */}
        </p>

        <p className="o-typography-body">
          {/* eslint-disable max-len */}
          The most serious issue in the {this.state.sector} industry is {'TK'} — {0} per cent of employees in the sector are classed as “physically inactive” meaning that they {'TK'}.
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
    ) : null;

    return (
      <div>
        <form>
          {selectSector}
          {selectDays}
        </form>

        {article}
      </div>
    );
  }
}

export default Select;
