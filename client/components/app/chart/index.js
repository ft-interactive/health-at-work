import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Chart extends PureComponent {
  render() {
    const { width, height } = this.props.graphicsDimensions;

    return (
      <section className="full-width">
        <svg
          className="chart"
          width={width}
          height={height}
        />
      </section>
    );
  }
}

Chart.propTypes = {
  graphicsDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Chart;
