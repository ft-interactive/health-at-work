import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SmallMultipleLine from './small-multiple-line';

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.chartData = [];
    this.margin = { top: 20, right: 10, bottom: 20, left: 10 };
    this.padding = { top: 0, right: 60, bottom: 60, left: 0 };
    this.transformData = this.transformData.bind(this);
  }

  componentDidMount() {
    this.transformData();
  }

  transformData() {
    console.log('Transforming data…');

    const {
      rank,
      age,
      absence,
      mostserious1,
      mostserious2,
      mostserious3,
      ...riskFactorKeys
    } = this.props.data[0];
    const riskFactors = Object.keys(riskFactorKeys);

    this.chartData = riskFactors.reduce((obj, key) => ({ ...obj, [key]: '' }), {});

    Object.keys(this.chartData).forEach((riskFactor) => {
      const agePercentages = [];

      this.props.data.forEach(ageGroup => (
        agePercentages.push({ age: ageGroup.age, percentage: ageGroup[riskFactor] })
      ));

      this.chartData[riskFactor] = agePercentages;
    });
  }

  render() {
    let stacked;
    switch (this.props.layout) {
      case 'XL':
      case 'L':
      case 'M':
        stacked = false;
        break;
      case 'S':
      case 'default':
      default:
        stacked = true;
    }
    const innerWidth = this.props.graphicsDimensions.width - this.margin.left - this.margin.right;
    const innerHeight = this.props.graphicsDimensions.height - this.margin.top - this.margin.bottom;
    const chartsCount = Object.keys(this.chartData).length;
    const width = stacked ?
      innerWidth - this.padding.left - this.padding.right :
      (innerWidth - this.padding.left - this.padding.right) / chartsCount;
    const height = stacked ?
      (innerHeight - this.padding.top - this.padding.bottom) / chartsCount :
      innerHeight - this.padding.top - this.padding.bottom;

    return (
      <section className="full-width">
        <svg
          className="chart"
          width={this.props.graphicsDimensions.width}
          height={this.props.graphicsDimensions.height}
        >
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
            {Object.keys(this.chartData).map((key, i) => (
              <SmallMultipleLine
                key={key}
                data={this.chartData[key]}
                width={width}
                height={height}
                transform={stacked ?
                  `translate(${this.padding.left}, ${this.padding.top + (i * height)})` :
                  `translate(${this.padding.left + (i * width)}, ${this.padding.top})`
                }
                axisTop={stacked && i === 0}
                axisRight={stacked || (!stacked && i === chartsCount - 1)}
                axisBottom={(stacked && i === chartsCount - 1) || !stacked}
              />
            ))}
          </g>
        </svg>
      </section>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  graphicsDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
  layout: PropTypes.string.isRequired,
};

export default Chart;
