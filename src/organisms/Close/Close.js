import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../molecules/Icon/Icon';
import './Close.styl';

/** Close button with action handler. It can contain label on its right side or left side */
function Close(props) {
  const classes = ['dc-close'];

  if (props.classes) {
    classes.push(props.classes);
  }
  return (
    <span
      data-component="Close"
      className={classes.join(' ')}
      onClick={props.onClose}
      title={props.tooltipText ? props.tooltipText : null}
    >
      {props.labelText && props.labelPosition === 'left' &&
        <span className="dc-close-label">{props.labelText}</span>
      }

      {!props.hideCross && <Icon icon="Cross" />}
      {props.labelText && props.labelPosition === 'right' &&
        <span className="dc-close-label">{props.labelText}</span>
      }
    </span>
  );
}

Close.propTypes = {
  classes: PropTypes.string,
  /** Text of the the label */
  labelText: PropTypes.string,
  /** function to be invoked when user clicks on a Close */
  onClose: PropTypes.func,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  /** if close button Close has cross */
  hideCross: PropTypes.bool,
  tooltipText: PropTypes.string
};

Close.defaultProps = {
  classes: '',
  labelText: '',
  labelPosition: 'left',
  onClose: () => {},
  hideCross: false,
  tooltipText: undefined
};

export default Close;
