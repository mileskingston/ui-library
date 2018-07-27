import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../molecules/Icon/Icon';
import './HeaderItem.styl';

function linkClassNames(props) {
  const classes = ['dc-header-item'];

  if (props.className) {
    classes.push(...props.className.split(' '));
  }

  return classes.join(' ');
}

function badgeClassNames(props) {
  const classes = ['dc-header-item__badge'];

  if (props.badge.count < 10) {
    classes.push('dc-header-item__badge--circle');
  }

  return classes.join(' ');
}

const HeaderItem = props => (
  <a
    href={props.href}
    onClick={props.onClick}
    className={linkClassNames(props)}
    data-interaction={props.dataInteraction}
    data-qa={props.qa}
  >
    <Icon icon={props.icon} />
    {(props.badge.count > 0 || props.badge.displayZero) &&
      <span
        id={props.badge.contentElementId}
        className={badgeClassNames(props)}
        style={{
          backgroundColor: typeof props.badge.color === 'function'
            ? props.badge.color(props)
            : props.badge.color
        }}
      >
        {props.badge.count}
      </span>
    }
    <span className="dc-header-item__label">{props.label}</span>
  </a>
);

HeaderItem.propTypes = {
  badge: PropTypes.shape({
    contentElementId: PropTypes.string,
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    count: PropTypes.number,
    /**
     * Force badge to be displayed even if `badge.count` is zero
     */
    displayZero: PropTypes.bool
  }),
  /**
   * Additional classes to be used for the component
   */
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  dataInteraction: PropTypes.string,
  qa: PropTypes.string
};

HeaderItem.defaultProps = {
  badge: {
    contentElementId: undefined,
    color: 'transparent',
    count: 0,
    displayZero: false
  },
  className: '',
  href: undefined,
  onClick: () => {},
  dataInteraction: undefined,
  qa: undefined
};

HeaderItem.displayName = 'HeaderItem';

export default HeaderItem;
