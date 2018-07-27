import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import './Heading.styl';

const headingMixin = (Base, HeadingTag) => {

  Base.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    icon: PropTypes.string
  };

  return class extends Base {

    render() {
      const { props } = this;

      return (
        <HeadingTag data-component="Heading" className={`dc-heading dc-${HeadingTag}`}>
          {props.icon &&
          <span className="dc-heading-icon"><Icon icon={props.icon} /></span>
          }
          <span className="dc-heading-text">{props.children}</span>
        </HeadingTag>
      );
    }
  };
};

export class H1 extends headingMixin(React.PureComponent, 'h1') {}
export class H2 extends headingMixin(React.PureComponent, 'h2') {}
export class H3 extends headingMixin(React.PureComponent, 'h3') {}
export class H4 extends headingMixin(React.PureComponent, 'h4') {}
export class H5 extends headingMixin(React.PureComponent, 'h5') {}
export class H6 extends headingMixin(React.PureComponent, 'h6') {}

/* Just for styleguidist to detect and display component in the list. */
export default () => <span />;
