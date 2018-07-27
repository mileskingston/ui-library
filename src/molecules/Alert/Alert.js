import React from 'react';
import PropTypes from 'prop-types';
import './Alert.styl';

const ARROW_POSITION_TOP = 'top';
const ARROW_POSITION_BOTTOM = 'bottom';
const ARROW_POSITION_LEFT = 'left';
const ARROW_POSITION_RIGHT = 'right';
const ARROW_POSITION_NONE = 'none';
const PERCENT_SIGN = '%';

function Alert(props) {
  const componentClasses = ['dc-alert'];
  const arrowClasses = ['dc-alert__arrow'];
  const arrowStyle = {};

  if (props.dropShadow) {
    componentClasses.push('dc-alert--shadow');
  }

  arrowClasses.push(`dc-alert__arrow--${props.arrowPosition || 'none'}`);

  if (props.arrowShift !== 0) {
    const isPercentage = typeof props.arrowShift === 'string' &&
      props.arrowShift.indexOf(PERCENT_SIGN) > -1;

    const arrowShiftValue = parseInt(
      isPercentage ? props.arrowShift.replace(PERCENT_SIGN, '') : props.arrowShift,
      10
    );

    const arrowShiftValueAbs = `${Math.abs(arrowShiftValue)}${isPercentage ? PERCENT_SIGN : ''}`;

    switch (props.arrowPosition) {
      case ARROW_POSITION_TOP:
      case ARROW_POSITION_BOTTOM: {
        arrowStyle[arrowShiftValue > 0 ? 'left' : 'right'] = arrowShiftValueAbs;
        arrowStyle[arrowShiftValue < 0 ? 'left' : 'right'] = 'auto';
        break;
      }

      case ARROW_POSITION_LEFT:
      case ARROW_POSITION_RIGHT: {
        arrowStyle[arrowShiftValue > 0 ? 'top' : 'bottom'] = arrowShiftValueAbs;
        arrowStyle[arrowShiftValue < 0 ? 'top' : 'bottom'] = 'auto';
        break;
      }

      case ARROW_POSITION_NONE:
      default: {
        break;
      }
    }
  }

  return (
    <div className={componentClasses.join(' ')} data-component="Alert" data-qa={props.qa}>
      {props.header &&
        <div className="dc-alert__header">
          {props.header}
        </div>
      }

      <span className={arrowClasses.join(' ')} style={arrowStyle} />

      <div className="dc-alert__content">
        {props.children}
      </div>
    </div>
  );
}

Alert.displayName = 'Alert';

Alert.propTypes = {
  /**
   * Side of the container the arrow is attached to.
   */
  arrowPosition: PropTypes.oneOf([
    ARROW_POSITION_NONE,
    ARROW_POSITION_TOP,
    ARROW_POSITION_BOTTOM,
    ARROW_POSITION_LEFT,
    ARROW_POSITION_RIGHT
  ]),
  /**
   * Shift of the arrow in 'px' or '%'
   * from left|top (positive number) or from right|bottom (negative number).
   */
  arrowShift: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  header: PropTypes.string,
  dropShadow: PropTypes.bool,
  qa: PropTypes.string
};

Alert.defaultProps = {
  arrowPosition: ARROW_POSITION_NONE,
  arrowShift: 0,
  header: undefined,
  dropShadow: false,
  qa: undefined
};

export default Alert;
