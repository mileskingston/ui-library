import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ExpandableText.styl';

class ExpandableText extends PureComponent {

  /**
   * Renders component children inline
   *
   * Collapsed:
   * ```
   * {toggle more}
   * ```
   *
   * Expanded:
   * ```
   * {children} {toggle less}
   * ```
   *
   * @public
   * @param {ExpandableText} component
   * @return {React.Node}
   */
  static inlineRenderer(component) {
    return (
      <span data-component="ExpandableText" className={component.resolveClasses().join(' ')}>
        {component.state.isExpanded && component.props.children}&nbsp;{component.renderToggle()}
      </span>
    );
  }

  /**
   * Renders component children as blocks
   *
   * Collapsed:
   * ```
   * {toggle more}
   * ```
   *
   * Expanded:
   * ```
   * {toggle less}
   * {children}
   * ```
   *
   * @public
   * @param {ExpandableText} component
   * @return {React.Node}
   */
  static blockRenderer(component) {
    return (
      <div
        data-component="ExpandableText"
        className={component.resolveClasses().join(' ')}
        onClick={e => e.stopPropagation()}
      >
        {component.renderToggle()}
        <div
          className="dc-expandable-text__content"
          dangerouslySetInnerHTML={{ __html: component.props.children }}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: props.expanded
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState(state => ({
      isExpanded: !state.isExpanded
    }));
  }

  /**
   * @returns {string[]}
   */
  resolveClasses() {
    const { props, state } = this;
    const classes = ['dc-expandable-text'];

    if (state.isExpanded) {
      classes.push('dc-expandable-text--expanded');
    }

    if (props.className) {
      classes.push(props.className);
    }

    return classes;
  }

  renderToggle(classes = '') {
    return (
      <a
        className={`dc-link dc-expandable-text-link ${classes}`}
        href="#toggle"
        onClick={this.toggle}
        data-interaction={!this.state.isExpanded ? this.props.toggleInteraction : undefined}
      >
        {this.state.isExpanded
          ? this.props.textLess
          : this.props.textMore
        }
      </a>
    );
  }

  render() {
    return this.props.renderer(this);
  }

}

ExpandableText.displayName = 'ExpandableText';

ExpandableText.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
  textLess: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  textMore: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  /**
   * @param {ExpandableText} component
   */
  renderer: PropTypes.func,
  toggleInteraction: PropTypes.string
};

ExpandableText.defaultProps = {
  className: undefined,
  expanded: false,
  renderer: ExpandableText.inlineRenderer,
  toggleInteraction: undefined
};

export default ExpandableText;
