import React from 'react';
import PropTypes from 'prop-types';

function ChartHead(props) {
  return (
    <div
      className="chart-head"
      style={{ width: `${props.width}px` }}
    >
      <div className="stab-rule" />

      <h2 className="o-typography-heading-level-2">
        {props.title}
      </h2>

      <h3 className="o-typography-heading-level-3">{props.subHead}</h3>

      <div className="key">
        <svg
          width={18}
          height={18}
        >
          <line
            x1={0}
            x2={18}
            y1={9}
            y2={9}
          />
        </svg>

        <h3 className="o-typography-heading-level-3">Survey average (adjusted for age, income and gender)</h3>
      </div>
    </div>
  );
}

ChartHead.propTypes = {
  title: PropTypes.string.isRequired,
  subHead: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default ChartHead;
