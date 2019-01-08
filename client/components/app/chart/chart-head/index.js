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
    </div>
  );
}

ChartHead.propTypes = {
  title: PropTypes.string.isRequired,
  subHead: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default ChartHead;