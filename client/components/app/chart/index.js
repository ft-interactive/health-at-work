import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SmallMultipleLine from './small-multiple-line';

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.transformedData = [];
    this.margin = { top: 20, right: 10, bottom: 20, left: 10 };
    this.padding = { top: 0, right: 10, bottom: 0, left: 0 };
  }

  componentDidMount() {
    this.transformData();
  }

  transformData() {
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
    }).sort((a, b) => {
      const aAverage = a.chartData.find(d => d.age.toLowerCase() === 'average');
      const bAverage = b.chartData.find(d => d.age.toLowerCase() === 'average');

      return bAverage.percentage - aAverage.percentage;
    });

    this.transformedData = transformedData;
  }

  render() {
    const { transformedData, margin, padding } = this;
    const { highlighted, layout, graphicsDimensions } = this.props;
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
                highlighted={highlighted}
                layout={layout}
                transform={stacked ?
                  `translate(${padding.left}, ${padding.top + (i * height)})` :
                  `translate(${padding.left + (i * width)}, ${padding.top})`
                }
                axisTop={stacked && i === 0}
                axisRight={stacked || (!stacked && i === chartsCount - 1)}
                axisBottom={(stacked && i === chartsCount - 1) || !stacked}
                riskFactor={d.riskFactor}
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
  highlighted: PropTypes.bool.isRequired,
  layout: PropTypes.string.isRequired,
  graphicsDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Chart;
