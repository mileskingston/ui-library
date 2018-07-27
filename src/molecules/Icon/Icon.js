import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import icons from '../../atoms/icons';
import { camelToDash } from '../../helpers';

class Icon extends React.PureComponent {

  componentDidMount() {
    this.clearSize();
  }

  componentWillReceiveProps() {
    this.clearSize();
  }

  clearSize() {
    if (icons.clearSize) {
      const svgElements = this.element.querySelectorAll('svg');

      for (let i = 0; i < svgElements.length; i++) {
        svgElements[i].removeAttribute('width');
        svgElements[i].removeAttribute('height');
      }
    }
  }

  render() {
    const { props } = this;
    const IconComponent = icons[props.icon];
    const classes = ['dc-icon', `dc-icon-${camelToDash(props.icon)}`, props.className];

    if (!props.visible) {
      classes.push('dc-icon--hidden');
    }

    if (IconComponent === undefined) {
      console.error(`Icon ${props.icon} is not available to use.`);
      return <noscript />;
    }

    if (props.spin) {
      classes.push('dc-spin');
    }

    if (props.rotate) {
      classes.push(`dc-rotate-${props.rotate}`);
    }

    if (props.size === 'large') {
      classes.push('dc-icon-large');
    }

    return (
      <span
        data-component="Icon"
        data-name={props.icon}
        className={classes.join(' ')}
        ref={(iconElement) => { this.element = iconElement; }}
        style={props.style}
      >
        <IconComponent />
      </span>
    );
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  rotate: PropTypes.oneOf([0, 90, 180, 270]),
  size: PropTypes.string,
  spin: PropTypes.bool,
  visible: PropTypes.bool
};

Icon.defaultProps = {
  className: undefined,
  rotate: 0,
  size: undefined,
  spin: false,
  visible: true
};

export default Icon;

export const IconStyled = styled(Icon)``;
