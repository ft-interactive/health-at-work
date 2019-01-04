import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const ageOptions = props.data.filter(d => d.age.toLowerCase() !== 'average')
    .map(d => (
      <option
        key={`age-${d.rank}`}
        value={d.age}
      >
        {d.age}
      </option>
    ));

  return (
    <div>
      <label
        htmlFor="select-age"
        className="o-forms__label"
      >
        Select your age range
      </label>

      <select
        value={props.value}
        onChange={props.onChange}
        id="select-age"
        className="o-forms__select"
      >
        <option
          value={props.value}
          disabled
        >
          {props.value}
        </option>

        {ageOptions}
      </select>
    </div>
  );
}

Select.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
