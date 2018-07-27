import React from 'react';
import PropTypes from 'prop-types';

import './Steps.styl';

function Steps(props) {
  const classes = ['dc-steps', `dc-steps-${props.children.length}`];

  if (props.isHorizontal) {
    classes.push('dc-steps-horizontal');
  }

  return (
    <div className={classes.join(' ')}>
      {props.children.filter(c => c).map((child, i) => React.cloneElement(child, Object.assign(
        {
          key: i,
          step: i + 1
        },
        typeof props.currentStep === 'number'
          ? {
            isChecked: i + 1 < props.currentStep,
            isActive: i < props.currentStep
          } : {}
      )))}
    </div>
  );
}

Steps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array
  ]).isRequired,
  isHorizontal: PropTypes.bool,
  /**
   * If used, the `isChecked` and `isActive` props of child `Step`s are overridden so that the steps
   * before the current one are checked and active, the current step is active and the next steps
   * are neither active nor checked. 1-indexed (same as the `step` prop on `Step`s)
   */
  currentStep: PropTypes.number
};

Steps.defaultProps = {
  isHorizontal: false,
  currentStep: undefined
};

export default Steps;
