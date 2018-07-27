import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

function Link(props) {
  const LinkTag = props.isActive ? 'a' : 'span';
  const classes = [
    'dc-link',
    `dc-${props.isActive ? 'clr-primary' : 'link-disabled'}`
  ];

  return (
    <LinkTag data-qa={props.qa} href={`${props.path}`} className={classes.join(' ')}>
      {props.icon &&
        <Icon icon={props.icon} />
      }
      {props.label &&
        <span className="dc-link-label">{props.label}</span>
      }
      {props.iconArrow &&
        <Icon icon={props.iconArrow} />
      }
    </LinkTag>
  );
}

Link.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconArrow: PropTypes.string,
  isActive: PropTypes.bool,
  qa: PropTypes.string
};

Link.defaultProps = {
  isActive: true,
  icon: undefined,
  iconArrow: undefined,
  qa: undefined
};

export default Link;
