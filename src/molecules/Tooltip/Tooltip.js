import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import './Tooltip.styl';

function Tooltip(props) {
  const classes = ['dc-tooltip'];
  const isContentString = typeof props.children === 'string';

  if (props.type) {
    classes.push(`dc-tooltip-${props.type}`);
  }

  if (props.textAlign) {
    classes.push(`dc-tooltip-align-${props.textAlign}`);
  }

  if (props.arrow) {
    classes.push('dc-tooltip-arrow');
    classes.push(`dc-tooltip-arrow-${props.arrow}`);
  }

  if (props.arrowMobile) {
    classes.push(`dc-tooltip-arrow-mobile-${props.arrowMobile}`);
  }

  if (props.floating) {
    classes.push('dc-tooltip-floating');
  }

  if (props.radius) {
    classes.push('dc-tooltip-radius');
  }
    
  if (props.style) {
    classes.push(`dc-tooltip-style-${props.style}`);

    /* deprecated props.small */
  } else if (props.small) {
    classes.push('dc-tooltip-small');
  }

  let content;

  if (isContentString) {
    content = (
      <div
        data-component="Tooltip"
        className={classes.join(' ')}
        dangerouslySetInnerHTML={{ __html: props.children }}
      />
    );
  } else {
    content = (
      <div
        data-component="Tooltip"
        className={classes.join(' ')}
      >
        {props.children}
      </div>
    );
  }

  return (
    <CSSTransitionGroup
      transitionName="dc-tooltip"
      transitionAppearTimeout={1200}
      transitionEnterTimeout={1200}
      transitionLeaveTimeout={1200}
      transitionAppear={props.fadeInOut}
      transitionEnter={props.fadeInOut}
      transitionLeave={props.fadeInOut}
    >
      {props.display
        ? content
        : false
      }
    </CSSTransitionGroup>
  );
}

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  display: PropTypes.bool,
  floating: PropTypes.bool,
  fadeInOut: PropTypes.bool,
  radius: PropTypes.bool,
  /**
    * @deprecated "small" prop is deprecated, please use "style" prop with value "small" instead.
    */
  small: PropTypes.bool,
  style: PropTypes
    .oneOf([
      'small',
      'compact',
      'no-margin'
    ]),
  textAlign: PropTypes
    .oneOf([
      'left',
      'right',
      'center'
    ]),
  arrow: PropTypes
    .oneOf([
      'top',
      'right',
      'bottom',
      'left'
    ]),
  arrowMobile: PropTypes
    .oneOf([
      'top',
      'right',
      'bottom',
      'left'
    ]),
  type: PropTypes
    .oneOf([
      'positive',
      'negative',
      'neutral',
      'warning',
      'info',
      'tip'
    ])
};

Tooltip.defaultProps = {
  children: '',
  display: true,
  style: undefined,
  small: false,
  radius: true,
  floating: false,
  fadeInOut: false,
  textAlign: 'left',
  arrow: undefined,
  arrowMobile: undefined,
  type: 'info'
};

export default Tooltip;
