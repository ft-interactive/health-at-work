import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { scalePoint, scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { axisTop, axisRight, axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import { select } from 'd3-selection';

const d3 = Object.assign({}, {
  scalePoint,
  scaleLinear,
  line,
  axisTop,
  axisRight,
  axisBottom,
  format,
  select,
});

class SmallMultipleLine extends PureComponent {
  constructor(props) {
    super(props);

    this.x = d3.scalePoint();
    this.y = d3.scaleLinear()
      .domain([0, 80]);
    this.xAxisTop = d3.axisTop(this.x)
      .tickFormat('')
      .tickSizeOuter(0);
    this.xAxisBottom = d3.axisBottom(this.x)
      .tickFormat('')
      .tickSizeOuter(0);
    this.yAxis = d3.axisRight(this.y)
      .ticks(5);
    this.xGrid = d3.axisBottom(this.x)
      .tickValues([]);
    this.yGrid = d3.axisRight(this.y)
      .ticks(5)
      .tickFormat('');
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
    const { xAxisTop, xAxisBottom, yAxis, xGrid, yGrid } = this;
    const { width, height, layout } = this.props;
    const smallMultiplesGutter = ['XL', 'S', 'default'].includes(layout) ? 12 : 6;

    yAxis.tickFormat(this.props.axisRight ? d3.format(',.1s') : '');
    xGrid.tickSizeOuter(height - smallMultiplesGutter);
    yGrid.tickSize(width - smallMultiplesGutter);

    d3.select(this.gXAxis)
      .call(this.props.axisTop ? xAxisTop : xAxisBottom);

    d3.select(this.gYAxis)
      .call(yAxis);

    d3.select(this.gXGrid)
      .call(xGrid);

    d3.select(this.gYGrid)
        .call(yGrid)
      .select('.domain')
        .remove();
  }

  render() {
    const { x, y, lineGenerator } = this;
    const { data, width, height, highlighted, layout, transform } = this.props;
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

        <g
          ref={(g) => { this.gXGrid = g; }}
          className="x grid"
        />

        <g
          ref={(g) => { this.gYGrid = g; }}
          className="y grid"
        />

        {this.props.axisRight &&
          <g
            ref={(g) => { this.gYAxis = g; }}
            transform={`translate(${width - smallMultiplesGutter}, 0)`}
            className="y axis"
          />
        }

        <g className="line">
          <path
            d={lineGenerator(filteredData)}
          />
        </g>

        <g className="points">
          {filteredData.filter(d => d.age !== highlighted).map(d => (
            <circle
              key={d.age}
              cx={x(d.age)}
              cy={y(d.percentage)}
              r={4}
            />
          ))}

          {/*  Render highlighted circle separately to position it over other circles */}
          {filteredData.filter(d => d.age === highlighted).map(d => (
            <circle
              key={d.age}
              cx={x(d.age)}
              cy={y(d.percentage)}
              r={4}
              className={'highlighted'}
            />
          ))}
        </g>
      </g>
    );
  }
}

SmallMultipleLine.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  highlighted: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  layout: PropTypes.string.isRequired,
  transform: PropTypes.string.isRequired,
  axisTop: PropTypes.bool.isRequired,
  axisRight: PropTypes.bool.isRequired,
  axisBottom: PropTypes.bool.isRequired,
  riskFactor: PropTypes.string.isRequired,
};

export default SmallMultipleLine;
