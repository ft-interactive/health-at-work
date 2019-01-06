import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SmallMultipleLine from './small-multiple-line';

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.transformedData = [];
    this.margin = { top: 20, right: 10, bottom: 20, left: 10 };
    this.padding = { top: 0, right: 60, bottom: 60, left: 0 };
  }

  componentDidMount() {
    this.transformData();
  }

  transformData() {
    console.log('Transforming data…');

    const { data } = this.props;
    const {
      rank,
      age,
      absence,
      mostserious1,
      mostserious2,
      mostserious3,
      ...riskFactors
    } = data[0];
    const riskFactorKeys = Object.keys(riskFactors);
    const transformedData = riskFactorKeys.map((key) => {
      const chartData = [];

      data.forEach(d => chartData.push({ age: d.age, percentage: d[key] }));

      return { riskFactor: key, chartData };
    });

    this.transformedData = transformedData;
  }

  render() {
    const { transformedData, margin, padding } = this;
    const { graphicsDimensions, layout } = this.props;
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
            {transformedData.map((d, i) => (
              <SmallMultipleLine
                key={d.riskFactor}
                data={d.chartData}
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
