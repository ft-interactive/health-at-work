import React, { PureComponent } from 'react';
import oGrid from 'o-grid/main'; // eslint-disable-line

const responsiveGraphicsWrapper = (Component) => {
  class ResponsiveGraphicsWrapper extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        layout: 'S',
        graphicsDimensions: { width: 300, height: 400 },
        gutters: 10,
      };
      this.handleLayoutChange = this.handleLayoutChange.bind(this);
    }

    componentDidMount() {
      if (window) {
        oGrid.enableLayoutChangeEvents();

        this.handleLayoutChange(oGrid.getCurrentLayout());

        window.addEventListener('o-grid.layoutChange', ({ detail }) => this.handleLayoutChange(detail.layout));
      }
    }

    componentWillUnmount() {
      window.removeEventListener('o-grid.layoutChange', ({ detail }) => this.handleLayoutChange(detail.layout));
    }

    handleLayoutChange(newLayout) {
      console.log(`Layout change detected: ${newLayout}`);

      switch (newLayout) {
        case 'XL':
          return this.setState({
            graphicsDimensions: { width: 1180, height: 700 },
            gutters: 20,
          });
        case 'L':
          return this.setState({
            graphicsDimensions: { width: 700, height: 500 },
            gutters: 20,
          });
        case 'M':
          return this.setState({
            graphicsDimensions: { width: 700, height: 500 },
            gutters: 20,
          });
        case 'S':
        case 'default':
        default:
          return this.setState({
            graphicsDimensions: { width: 300, height: 400 },
            gutters: 10,
          });
      }
    }

    render() {
      const { layout, graphicsDimensions, gutters } = this.state;

      return (
        <Component
          {...this.props}
          layout={layout}
          graphicsDimensions={graphicsDimensions}
          gutters={gutters}
        />
      );
    }
  }

  return ResponsiveGraphicsWrapper;
};

export default responsiveGraphicsWrapper;
