import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import debounce from '../../helpers/debounce';
import './ClosableTooltip.styl';

import Tooltip from '../../molecules/Tooltip/Tooltip';
import Close from '../Close/Close';

class ClosableTooltip extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      lastScrollPosition: document.documentElement.scrollTop
    };

    if (props.onClickOutsideOfTooltip) {
      this.setWrapperRef = this.setWrapperRef.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    if (props.onScroll) {
      this.handleScroll = debounce(this.handleScroll.bind(this), 150, true);
    }
  }

  componentDidMount() {
    if (this.props.onClickOutsideOfTooltip) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    if (this.props.onScroll) {
      document.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (this.props.onClickOutsideOfTooltip) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    if (this.props.onScroll) {
      document.removeEventListener('scroll', this.handleScroll);
    }
  }

  /**
  * Set the wrapper ref for allowing detection of onClickOutsideOfTooltip
  */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
  * Alert if clicked on outside of element for allowing closeOnClickOutside functionality
  */
  handleClickOutside(event) {
    if ((this.wrapperRef && !this.wrapperRef.contains(event.target)) ||
        (this.props.parentWrapperRef && !this.props.parentWrapperRef.contains(event.target))) {
      this.props.onClickOutsideOfTooltip();
    }
  }

  /**
  * handling user scrolling within the page to support detection of onScroll functionality
  */
  handleScroll() {
    this.props.onScroll();
  }

  renderCloseButton() {
    const closeButton = (
      <div className="dc-closable-tooltip-close-button">
        <Close
          classes={this.props.closeButtonClasses}
          onClose={this.props.onCloseButtonClick ? this.props.onCloseButtonClick : () => {}}
          labelText={this.props.closeTooltipLabel}
          hideCross={this.props.hideCross}
        />
      </div>);

    if (this.props.closeButtonAlign === 'bottom') {
      return [this.props.children, closeButton];
    }

    return [closeButton, this.props.children];
  }

  render() {
    const { props } = this;
    const mainComponentClass = props.display ? 'dc-closable-tooltip' : 'dc-closable-tooltip_hidden';

    return (
      <div
        className={mainComponentClass}
        ref={props.onClickOutsideOfTooltip ? this.setWrapperRef : null}
      >
        <Tooltip
          arrow={props.arrow}
          arrowMobile={props.arrowMobile}
          style={props.style}
          type={props.type}
          floating={props.floating}
        >
          {this.renderCloseButton()}
        </Tooltip>
      </div>
    );
  }
}

ClosableTooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  floating: PropTypes.bool,
  style: PropTypes.oneOf([
    'small',
    'compact',
    'no-margin'
  ]),
  arrow: PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left'
  ]),
  arrowMobile: PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left'
  ]),
  type: PropTypes.oneOf([
    'positive',
    'negative',
    'neutral',
    'warning',
    'info',
    'tip'
  ]),
  closeButtonClasses: PropTypes.string,
  /** function triggered when user clicks on the close button */
  onCloseButtonClick: PropTypes.func,
  /** function triggered when clicking outside of the Tooltip */
  onClickOutsideOfTooltip: PropTypes.func,
  /** function triggered when user scrolls while the Tooltip is opened */
  onScroll: PropTypes.func,
  /** if Tooltip is displayed or not */
  display: PropTypes.bool,
  /** if close button is positioned */
  closeButtonAlign: PropTypes.oneOf(['top', 'bottom']),
  /** if close button has different label than Close */
  closeTooltipLabel: PropTypes.string,
  parentWrapperRef: PropTypes.element,
  hideCross: PropTypes.bool
};

ClosableTooltip.defaultProps = {
  children: '',
  type: 'info',
  floating: false,
  style: 'no-margin',
  // TODO: remove this class and change styles in parent component
  closeButtonClasses: 'dc-closable-tooltip-default',
  closeButtonAlign: 'top',
  closeTooltipLabel: 'Close',
  arrow: undefined,
  arrowMobile: undefined,
  onCloseButtonClick: undefined,
  onClickOutsideOfTooltip: undefined,
  onScroll: undefined,
  display: true,
  parentWrapperRef: null,
  hideCross: false
};

export default ClosableTooltip;
