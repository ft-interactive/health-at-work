import React, { PureComponent } from 'react';
import oGrid from 'o-grid/main'; // eslint-disable-line

const responsiveGraphicsWrapper = (Component) => {
  class ResponsiveGraphicsWrapper extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        layout: 'S',
        graphicsDimensions: { width: 300, height: 1180 },
        gutters: 10,
      };
      this.handleLayoutChange = this.handleLayoutChange.bind(this);
    }

    componentDidMount() {
      this._isMounted = true;

      if (window) {
        oGrid.enableLayoutChangeEvents();

        this.handleLayoutChange(oGrid.getCurrentLayout());

        window.addEventListener('o-grid.layoutChange', ({ detail }) => this.handleLayoutChange(detail.layout));
      }
    }

    componentWillUnmount() {
      window.removeEventListener('o-grid.layoutChange', ({ detail }) => this.handleLayoutChange(detail.layout));

      this._isMounted = false;
    }

    handleLayoutChange(newLayout) {
      if (this._isMounted) {
        console.log(`Layout change detected: ${newLayout}`);

        switch (newLayout) {
          case 'XL':
            this.setState({
              layout: newLayout,
              graphicsDimensions: { width: 1180, height: 500 },
              gutters: 20,
            });

            return;
          case 'L':
            this.setState({
              layout: newLayout,
              graphicsDimensions: { width: 700, height: 500 },
              gutters: 20,
            });

            return;
          case 'M':
            this.setState({
              layout: newLayout,
              graphicsDimensions: { width: 700, height: 500 },
              gutters: 20,
            });

            return;
          case 'S':
          case 'default':
          default:
            this.setState({
              layout: newLayout,
              graphicsDimensions: { width: 300, height: 1180 },
              gutters: 10,
            });
        }
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
