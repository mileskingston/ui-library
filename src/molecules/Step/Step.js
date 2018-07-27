import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

function Step(props) {
  const classes = ['dc-step'];

  if (props.classes) {
    classes.push('dc-step-iframe');
  }

  if (props.isActive) {
    classes.push('dc-step-active');
  }

  if (props.isChecked) {
    classes.push('dc-step-checked');
  }

  if (props.large) {
    classes.push('dc-step-large');
  }

  return (
    <div className={classes.join(' ')}>
      <div className="dc-step-number">
        {props.isChecked ? <Icon icon="Tick" /> : props.step}
      </div>
      <div className="dc-step-content">{props.children}</div>
    </div>
  );
}

Step.propTypes = {
  step: PropTypes.number,
  classes: PropTypes.string,
  large: PropTypes.bool,
  isActive: PropTypes.bool,
  isChecked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired
};

Step.defaultProps = {
  step: undefined,
  classes: undefined,
  large: false,
  isActive: false,
  isChecked: false
};

export default Step;
