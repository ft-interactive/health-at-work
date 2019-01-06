import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SmallMultipleLine from './small-multiple-line';

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.transformedData = {};
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

    this.transformedData = riskFactors.reduce((obj, key) => ({ ...obj, [key]: '' }), {});

    Object.keys(this.transformedData).forEach((riskFactor) => {
      const agePercentages = [];

      this.props.data.forEach(ageGroup => (
        agePercentages.push({ age: ageGroup.age, percentage: ageGroup[riskFactor] })
      ));

      this.transformedData[riskFactor] = agePercentages;
    });
  }

  render() {
    const { graphicsDimensions, layout } = this.props;
    const { transformedData, margin, padding } = this;
    const stacked = !['XL', 'L', 'M'].includes(layout);
    const innerWidth = graphicsDimensions.width - margin.left - margin.right;
    const innerHeight = graphicsDimensions.height - margin.top - margin.bottom;
    const chartsCount = Object.keys(transformedData).length;
    const width = stacked ?
      innerWidth - padding.left - padding.right :
      (innerWidth - padding.left - padding.right) / chartsCount;
    const height = stacked ?
      (innerHeight - padding.top - padding.bottom) / chartsCount :
      innerHeight - padding.top - padding.bottom;

    return (
      <section className="full-width">
        <svg
          className="chart"
          width={graphicsDimensions.width}
          height={graphicsDimensions.height}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {Object.keys(transformedData).map((key, i) => (
              <SmallMultipleLine
                key={key}
                data={transformedData[key]}
                width={width}
                height={height}
                layout={layout}
                transform={stacked ?
                  `translate(${padding.left}, ${padding.top + (i * height)})` :
                  `translate(${padding.left + (i * width)}, ${padding.top})`
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
