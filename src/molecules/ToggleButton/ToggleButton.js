import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button/Button';

import './ToggleButton.styl';

function ToggleButton(props) {
  const sizePrefix = props.size === 'normal' ? '' : `${props.size}-`;
  const activeIcon = props.showActiveIcon ? props.activeIcon : undefined;
  if (props.active) {
    return (
      <Button
        style={`${sizePrefix}full`}
        classes={`dc-toggle-button__active ${props.classes}`}
        icon={activeIcon}
        onClick={props.onToggle}
      >
        {props.activeBtnContent}
      </Button>
    );
  }

  return (
    <Button
      style={`${sizePrefix}outline`}
      classes={`dc-toggle-button ${props.classes}`}
      onClick={props.onToggle}
    >
      {props.inActiveBtnContent}
    </Button>
  );
}

ToggleButton.displayName = 'ToggleButton';

ToggleButton.propTypes = {
  active: PropTypes.bool,
  activeBtnContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  activeIcon: PropTypes.string,
  classes: PropTypes.string,
  inActiveBtnContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  onToggle: PropTypes.func.isRequired,
  showActiveIcon: PropTypes.bool,
  size: PropTypes.oneOf(['normal', 'small'])
};

ToggleButton.defaultProps = {
  active: false,
  activeIcon: 'Tick',
  classes: '',
  showActiveIcon: false,
  size: 'normal'
};

export default ToggleButton;
