import React from 'react';

function Select(props) {
  const incomeOptions = props.data.map(d => (
    <option
      key={`income${d.rank}`}
      value={d.income}
    >
      {d.income}
    </option>
  ));

  return (
    <div className="o-forms">
      <label
        htmlFor="select-income"
        className="o-forms__label"
      >
        Select your income range
      </label>

      <select
        value={props.value}
        onChange={props.onChange}
        id="select-income"
        className="o-forms__select"
      >
        <option
          value={props.value}
          disabled
        >
          {props.value}
        </option>

        {incomeOptions}
      </select>
    </div>
  );
}

export default Select;
