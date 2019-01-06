import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisTop, axisRight, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

const d3 = Object.assign({}, { scaleBand, scaleLinear, axisTop, axisRight, axisBottom, select });

class SmallMultipleLine extends PureComponent {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.renderSmallMultiple = this.renderSmallMultiple.bind(this);
  }

  componentDidMount() {
    this.renderSmallMultiple();
  }

  componentDidUpdate() {
    this.renderSmallMultiple();
  }

  renderSmallMultiple() {
    const { data, width, height, layout } = this.props;
    const smallMultiplesGutter = ['XL, L, M'].includes(layout) ? 20 : 10;
    const x = d3.scaleBand()
      .domain(data.map(d => d.age))
      .range([0, width - smallMultiplesGutter]);
    const y = d3.scaleLinear()
      .domain([0, 80])
      .range([height, 0]);
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisRight(y);

    d3.select(this.xAxis)
      .call(xAxis);

    d3.select(this.yAxis)
      .call(yAxis);
  }

  render() {
    const { width, height, transform } = this.props;
    const xAxis = (this.props.axisTop || this.props.axisBottom) &&
      <g
        ref={(g) => { this.xAxis = g; }}
        transform={`translate(0, ${this.props.axisBottom ? height : 0})`}
      />;
    const yAxis = this.props.axisRight &&
      <g
        ref={(g) => { this.yAxis = g; }}
        transform={`translate(${width}, 0)`}
      />;

    return (
      <g transform={transform}>
        {xAxis}
        {yAxis}
      </g>
    );
  }
}

SmallMultipleLine.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.string.isRequired,
  transform: PropTypes.string.isRequired,
  axisTop: PropTypes.bool.isRequired,
  axisRight: PropTypes.bool.isRequired,
  axisBottom: PropTypes.bool.isRequired,
};

export default SmallMultipleLine;
