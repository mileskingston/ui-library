import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../molecules/Tooltip/Tooltip';
import Icon from '../../molecules/Icon/Icon';

import './Button.styl';

class Button extends PureComponent {

  /**
   * @public
   */
  focus() {
    this.button.focus();
  }

  render() {
    const { props } = this;

    let classes = ['dc-button', 'nostyle'];
    let buttonText = props.children;

    if (props.style === 'outline') {
      classes.push(
        'dc-clr-primary',
        'dc-border-primary',
        'dc-background-empty'
      );
    }

    if (props.style === 'full') {
      classes.push(
        'dc-background-primary',
        'dc-background-primary-hover',
        'dc-border-primary',
        'dc-border-primary-hover'
      );
    }

    if (props.style === 'small-outline') {
      classes.push(
        'dc-clr-primary',
        'dc-border-primary',
        'dc-background-empty',
        'dc-button-small'
      );
    }

    if (props.style === 'small-full') {
      classes.push(
        'dc-background-primary',
        'dc-background-primary-hover',
        'dc-border-primary',
        'dc-border-primary-hover',
        'dc-button-small'
      );
    }

    if (props.style === 'link') {
      classes.push(
        'dc-button-link',
      );
    }

    if (props.style === 'checkout') {
      classes.push(
        'dc-clr-checkout',
        'dc-border-checkout',
        'dc-background-checkout'
      );
    }

    if (props.style === 'checkout-download') {
      classes.push(
        'dc-clr-checkout-download',
        'dc-border-checkout-download',
        'dc-background-checkout-download'
      );
    }

    if (props.style === 'none') {
      classes.push('dc-button-style-none');
    }

    if (props.classes) {
      classes = classes.concat(props.classes.split(' '));
    }

    if (props.disabled) {
      classes.push('dc-button-disabled');
    }

    if (props.workInProgress) {
      classes.push('dc-button-disabled');

      if (props.workInProgressText) {
        buttonText = props.workInProgressText;
      }
    }

    return (
      <div className="dc-button-wrapper">
        <button
          ref={(button) => { this.button = button; }}
          className={classes.join(' ')}
          data-component="Button"
          data-qa={props.qa}
          data-interaction={props.dataInteraction}
          disabled={props.disabled || props.workInProgress}
          onClick={props.onClick}
          type={props.type}
          name={props.name}
        >
          {props.icon &&
          <span className="dc-button-icon"><Icon icon={props.icon} /></span>
          }
          <span className="dc-button-text">{buttonText}{' '}</span>
          {props.workInProgress &&
          <span className="dc-button-spinner"><Icon icon="Spinner" spin /></span>
          }
          {props.isToggle &&
          <span className="dc-button-arrow"><Icon icon="ChevronRight" rotate={90} /></span>
          }
        </button>

        <Tooltip
          display={!!props.tooltip}
          type={props.tooltipType}
          fadeInOut={props.fadeInOut}
          textAlign="center"
          arrow={props.tooltipArrow}
          arrowMobile={props.tooltipArrow}
          floating
          radius
          style="small"
        >{props.tooltip}
        </Tooltip>
      </div>
    );
  }

}

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  dataInteraction: PropTypes.string,
  disabled: PropTypes.bool,
  workInProgress: PropTypes.bool,
  workInProgressText: PropTypes.string,
  fadeInOut: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  classes: PropTypes.string,
  icon: PropTypes.string,
  isToggle: PropTypes.bool,
  type: PropTypes
    .oneOf([
      'button',
      'submit',
      'reset'
    ]),
  style: PropTypes
    .oneOf([
      'link',
      'outline',
      'full',
      'small-outline',
      'small-full',
      'checkout',
      'checkout-download',
      'none'
    ]),
  tooltip: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  tooltipType: PropTypes
    .oneOf([
      'positive',
      'negative',
      'info',
      'warning'
    ]),
  tooltipArrow: PropTypes
    .oneOf([
      'top',
      'right',
      'bottom',
      'left'
    ]),
  qa: PropTypes.string
};

Button.defaultProps = {
  dataInteraction: undefined,
  type: 'submit',
  style: 'outline',
  disabled: false,
  fadeInOut: false,
  workInProgress: false,
  workInProgressText: '',
  name: '',
  classes: '',
  onClick: () => {},
  tooltip: null,
  tooltipType: 'positive',
  tooltipArrow: 'top',
  isToggle: false,
  icon: undefined,
  qa: undefined
};

export default Button;
