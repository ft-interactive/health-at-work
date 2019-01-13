import React from 'react';
import PropTypes from 'prop-types';

function ChartFooter(props) {
  const { source, credit, width } = props;

  return (
    <div
      className="chart-footer"
      style={{ width: `${width}px` }}
    >
      <footer className="o-typography-footer">
        Sources: {source}<br />

        {credit}<br />

        <em>© FT</em>
      </footer>
    </div>
  );
}

ChartFooter.propTypes = {
  source: PropTypes.string.isRequired,
  credit: PropTypes.element.isRequired,
  width: PropTypes.number.isRequired,
};

export default ChartFooter;
