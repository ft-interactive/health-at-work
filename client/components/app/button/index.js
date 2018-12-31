import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <div className="o-forms">
      <button
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
        className="o-buttons o-buttons--big o-buttons--primary"
        id="submit-button"
      >
        {props.value}

        {(!props.submitted && <i className="icon-down" />) || <i className="icon-refresh" />}
      </button>
    </div>
  );
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
};

export default Button;
