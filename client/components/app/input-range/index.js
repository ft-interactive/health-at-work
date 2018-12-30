import React from 'react';

function InputRange(props) {
  return (
    <div className="o-forms range-input">
      <label
        htmlFor="select-days"
        className="o-forms__label"
      >
        Guess the number of productive days lost
      </label>

      <div className="range-input-container">

        <div className="range-labels">
          <div className="range-labels-min">0</div>
          <div className="range-labels-max">50</div>
        </div>

        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </div>

      <output>
        {props.value}
      </output>
    </div>
  );
}

export default InputRange;
