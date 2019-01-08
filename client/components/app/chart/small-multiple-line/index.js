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

    this.x = d3.scalePoint()
      .padding(0);
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
    const smallMultiplesGutter = ((l) => {
      switch (l) {
        case 'XL':
          return 12;
        case 'L':
          return 6;
        case 'M':
          return 3;
        case 'S':
        case 'default':
        default:
          return 18;
      }
    })(layout);

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
    const { data, index, width, height, highlighted, layout, stacked, transform } = this.props;
    const filteredData = data.filter(d => d.age.toLowerCase() !== 'average');
    const smallMultiplesGutter = ((l) => {
      switch (l) {
        case 'XL':
          return 12;
        case 'L':
          return 6;
        case 'M':
          return 3;
        case 'S':
        case 'default':
        default:
          return 20;
      }
    })(layout);
    const circleRadius = ((l) => {
      switch (l) {
        case 'XL':
          return 4.4;
        case 'L':
          return 3.6;
        case 'M':
          return 2.6;
        case 'S':
        case 'default':
        default:
          return 4.4;
      }
    })(layout);
    const labelX = (age) => {
      switch (age) {
        case ('18-20'):
          return circleRadius;
        case (age === '66+' && layout === 'M' ? age : null):
          return circleRadius;
        case '66+':
          return -circleRadius;
        default:
          return -circleRadius;
      }
    };
    const labelY = (age) => {
      switch (age) {
        case (age === '18-20' && stacked ? age : null):
          return circleRadius;
        case (age === '18-20' && !stacked ? age : null):
          return -circleRadius;
        case '66+':
          return -circleRadius;
        default:
          return circleRadius * 3;
      }
    };

    x.domain(filteredData.map(d => d.age))
      .rangeRound([0, width - smallMultiplesGutter]);

    y.range([height - smallMultiplesGutter, 0]);

    lineGenerator.x(d => x(d.age))
      .y(d => y(d.percentage));

    return (
      <g
        transform={transform}
        className="small-multiple-line"
      >
        <rect
          width={width - smallMultiplesGutter}
          height={height - smallMultiplesGutter}
          className="background"
        />

        <g
          ref={(g) => { this.gXGrid = g; }}
          className="x grid"
        />

        <g
          ref={(g) => { this.gYGrid = g; }}
          className="y grid"
        />

        {this.props.axisBottom &&
          <g
            ref={(g) => { this.gXAxis = g; }}
            transform={`translate(0, ${height - smallMultiplesGutter})`}
            className="x axis"
          />
        }

        {this.props.axisTop &&
          <g
            ref={(g) => { this.gXAxis = g; }}
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

        <g className="marks">
          <g className="line">
            <path
              d={lineGenerator(filteredData)}
            />
          </g>

          {filteredData.map(d =>
            d.age !== highlighted && (
            <g
              key={d.age}
              className="points"
            >
              <circle
                cx={x(d.age)}
                cy={y(d.percentage)}
                r={circleRadius}
              />
            </g>
          ))}
        </g>

        {filteredData.map(d => (
          index === 0 && ['18-20', '66+', highlighted].includes(d.age) && (
            <text
              key={d.age}
              x={x(d.age) + labelX(d.age)}
              y={y(d.percentage) + labelY(d.age)}
              className={`point-label${d.age === highlighted ? ' highlighted' : ''}`}
              style={!['18-20', '66+'].includes(d.age) ?
                { textAnchor: 'end' } :
                null
              }
            >
              {d.age}
            </text>
          )
        ))}

        {/*  Render highlighted circle separately to position it over other circles */}
        {filteredData.filter(d => d.age === highlighted).map(d => (
          <circle
            key={d.age}
            cx={x(d.age)}
            cy={y(d.percentage)}
            r={circleRadius}
            className={'highlighted'}
          />
        ))}
      </g>
    );
  }
}

SmallMultipleLine.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  highlighted: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  layout: PropTypes.string.isRequired,
  stacked: PropTypes.bool.isRequired,
  transform: PropTypes.string.isRequired,
  axisTop: PropTypes.bool.isRequired,
  axisRight: PropTypes.bool.isRequired,
  axisBottom: PropTypes.bool.isRequired,
  riskFactor: PropTypes.string.isRequired,
};

export default SmallMultipleLine;
