import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SmallMultipleLine extends PureComponent {
  constructor(props) {
    super(props);

    this.data = props.data;
  }

  render() {
    return <g transform={this.props.transform} />;
  }
}

SmallMultipleLine.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SmallMultipleLine;
