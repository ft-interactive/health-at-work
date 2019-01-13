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
      .tickSizeOuter(0);
    this.xAxisBottom = d3.axisBottom(this.x)
      .tickSizeOuter(0);
    this.yAxis = d3.axisRight(this.y)
      .ticks(5);
    this.xGrid = d3.axisBottom(this.x)
      .tickValues([]);
    this.yGrid = d3.axisRight(this.y)
      .ticks(5)
      .tickFormat('');
    this.lineGenerator = d3.line();
    this.currentGutter = this.currentGutter.bind(this);
    this.renderAxes = this.renderAxes.bind(this);
  }

  componentDidMount() {
    this.renderAxes();
  }

  componentDidUpdate() {
    this.renderAxes();
  }

  currentGutter() {
    switch (this.props.layout) {
      case 'XL':
        return 12;
      case 'L':
        return 6;
      case 'M':
        return 3;
      case 'S':
      case 'default':
      default:
        return 34.5;
    }
  }

  renderAxes() {
    const { xAxisTop, xAxisBottom, yAxis, xGrid, yGrid, currentGutter } = this;
    const { width, height, stacked } = this.props;
    const gutter = currentGutter();

    yAxis.tickFormat(this.props.axisRight ? d3.format(',.1s') : '');
    xGrid.tickSizeOuter(height - gutter);
    yGrid.tickSize(width - gutter);
    xAxisTop.tickFormat(d => (['18-20', '41-45', '66+'].includes(d) ? d : ''));
    xAxisBottom.tickFormat(d => (stacked && ['18-20', '41-45', '66+'].includes(d) ? d : ''));

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
    const { x, y, lineGenerator, currentGutter } = this;
    const {
      data,
      index,
      width,
      height,
      highlighted,
      layout,
      stacked,
      transform,
      riskFactor,
    } = this.props;
    const filteredData = data.filter(d => d.age.toLowerCase() !== 'average');
    const gutter = currentGutter();
    const fontSize = ((l) => {
      switch (l) {
        case 'XL':
          return 18;
        case 'L':
        case 'M':
          return 16;
        case 'S':
        case 'default':
        default:
          return 14;
      }
    })(layout);
    const circleRadius = ((l) => {
      switch (l) {
        case 'XL':
          return 4.5;
        case 'L':
          return 4;
        case 'M':
          return 3.5;
        case 'S':
        case 'default':
        default:
          return 4.5;
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
    const chartLabel = ((rf) => {
      switch (rf) {
        case 'fruitvegpc':
          return 'Healthy eating';
        case 'twomscondspc':
          return ['Musculoskeletal', 'ailments'];
        case 'bingepc':
          return 'Binge drinking';
        case 'sleeppc':
          return 'Inadequate sleep';
        case 'physicallyinactivepc':
          return 'Inactivity';
        case 'alcoholpc':
          return 'Excessive drinking';
        case 'twoplusstressdimensions':
          return 'High stress';
        case 'obesepc':
          return 'Obesity';
        case 'smokepc':
          return 'Smoking';
        case 'finconcernspc':
          return 'Financial concerns';
        case 'depressionpc':
          return 'Depression';
        default:
          return this.props.riskFactor;
      }
    })(riskFactor);

    x.domain(filteredData.map(d => d.age))
      .rangeRound([0, width - gutter]);

    y.range([height - gutter, 0]);

    lineGenerator.x(d => x(d.age))
      .y(d => y(d.percentage));

    return (
      <g
        transform={transform}
        className="small-multiple-line"
      >
        <text
          transform={stacked ?
            `translate(${(width - gutter) / 2}, ${this.props.axisTop ? -24.5 : -9})` :
            `translate(${(width - gutter) / 2}, -9) rotate(-45)`
          }
          className="chart-label"
        >
          {Array.isArray(chartLabel) ?
            chartLabel.map((d, i) => (
              <tspan
                key={d}
                x={stacked ? null : 0}
                y={stacked ? null : -fontSize + (i * fontSize)}
              >
                {stacked ?
                  `${d} ` :
                  d
                }
              </tspan>
            )) :
            chartLabel
          }
        </text>

        <rect
          width={width - gutter}
          height={height - gutter}
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
            transform={`translate(0, ${height - gutter})`}
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
            transform={`translate(${width - gutter}, 0)`}
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

        {filteredData.map((d) => {
          const visibleLabels = stacked ? [highlighted] : ['18-20', '66+', highlighted];
          const hiddenLabels = stacked ? ['18-20', '66+'] : [];

          return (
            index === 0 && visibleLabels.includes(d.age) && !hiddenLabels.includes(d.age) && (
              <text
                key={d.age}
                x={x(d.age) + labelX(d.age)}
                y={y(d.percentage) + labelY(d.age)}
                className={`point-label${d.age === highlighted ? ' highlighted' : ''}`}
                style={d.age === '18-20' ? { textAnchor: 'start' } : null}
              >
                {d.age}
              </text>
            )
          );
        })}

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
