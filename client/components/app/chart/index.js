import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SmallMultipleLine from './small-multiple-line';

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.chartData = [];
    this.margin = { top: 20, right: 10, bottom: 20, left: 10 };
    this.padding = { top: 0, right: 0, bottom: 60, left: 60 };
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
    const { width, height } = this.props.graphicsDimensions;

    return (
      <section className="full-width">
        <svg
          className="chart"
          width={width}
          height={height}
        >
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
            {Object.keys(this.chartData).map(key => (
              <SmallMultipleLine
                key={key}
                data={this.chartData[key]}
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
  graphicsDimensions: PropTypes.objectOf(PropTypes.any),
  layout: PropTypes.string.isRequired,
};

Chart.defaultProps = {
  graphicsDimensions: { width: 300, height: 400 },
};

export default Chart;
