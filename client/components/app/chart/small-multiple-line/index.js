import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { scalePoint, scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { axisTop, axisRight, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

const d3 = Object.assign({}, {
  scalePoint,
  scaleLinear,
  line,
  axisTop,
  axisRight,
  axisBottom,
  select,
});

class SmallMultipleLine extends PureComponent {
  constructor(props) {
    super(props);

    this.x = d3.scalePoint();
    this.y = d3.scaleLinear()
      .domain([0, 80]);
    this.xAxis = d3.axisBottom(this.x)
      .tickFormat('')
      .tickSizeOuter(0);
    this.yAxis = d3.axisRight(this.y)
      .ticks(5);
    this.lineGenerator = d3.line();
    this.renderAxes = this.renderAxes.bind(this);
  }

  componentDidMount() {
    this.renderAxes();
  }

  componentDidUpdate() {
    this.renderAxes();
  }

  renderAxes() {
    const { xAxis, yAxis } = this;

    d3.select(this.gXAxis)
      .call(xAxis);

    d3.select(this.gYAxis)
      .call(yAxis);
  }

  render() {
    const { x, y, lineGenerator } = this;
    const { data, width, height, layout, transform } = this.props;
    const filteredData = data.filter(d => d.age.toLowerCase() !== 'average');
    const smallMultiplesGutter = ['L', 'M'].includes(layout) ? 6 : 12;

    x.domain(filteredData.map(d => d.age))
      .rangeRound([0, width - smallMultiplesGutter])
      .padding(0);

    y.range([height - smallMultiplesGutter, 0]);

    lineGenerator.x(d => x(d.age))
      .y(d => y(d.percentage));

    return (
      <g transform={transform}>
        {(this.props.axisTop || this.props.axisBottom) &&
          <g
            ref={(g) => { this.gXAxis = g; }}
            transform={`translate(0, ${this.props.axisBottom ? height - smallMultiplesGutter : 0})`}
            className="x axis"
          />
        }

        {this.props.axisRight &&
          <g
            ref={(g) => { this.gYAxis = g; }}
            transform={`translate(${width - smallMultiplesGutter}, 0)`}
            className="y axis"
          />
        }

        <path
          d={lineGenerator(filteredData)}
          className="line"
        />
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
