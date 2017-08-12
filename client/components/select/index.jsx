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
      value: event.target.value,
      changed: true,
    });
  }

  render() {
    const article = this.state.changed ? (
      <p>{this.state.value}</p>
    ) : null;

    return (
      <div>
        <form>
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
        </form>

        {article}
      </div>
    );
  }
}

export default Select;
