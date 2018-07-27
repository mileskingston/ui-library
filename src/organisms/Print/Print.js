import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../molecules/Icon/Icon';
import './Print.styl';

function Print(props) {
  return (
    <a data-component="Print" className="dc-print dc-link" onClick={window.print}>
      <Icon icon="Print" />
      {props.label &&
        <span className="dc-print-label">
          {props.label}
        </span>
      }
    </a>
  );
}

Print.propTypes = {
  label: PropTypes.string
};

Print.defaultProps = {
  label: ''
};

export default Print;
