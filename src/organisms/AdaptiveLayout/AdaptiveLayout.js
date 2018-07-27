import React from 'react';
import PropTypes from 'prop-types';

require('./AdaptiveLayout.styl');

export default class AdaptiveLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: 'desktop'
    };

    this.mediaQueryHandler = this.mediaQueryHandler.bind(this);
    
    if (typeof window !== 'undefined') {
      AdaptiveLayout.events.forEach((eventName) => {
        window.addEventListener(eventName, this.mediaQueryHandler);
      });
    }
    
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.mediaQueryHandler();
    }
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') {
      return;
    }
    AdaptiveLayout.events.forEach((eventName) => {
      window.removeEventListener(eventName, this.mediaQueryHandler);
    });
  }

  mediaQueryHandler() {
    const element = document
      .querySelector('[data-layout]');
    const currentLayout = element
      ? window.getComputedStyle(element, ':after').getPropertyValue('content').replace(/"/g, '')
      : 'mobile';
    if (currentLayout !== this.state.layout) {
      this.setState({
        layout: currentLayout
      });
    }
  }

  renderLayout() {
    switch (this.state.layout) {
      case 'desktop':
        return this.props.desktop;
      case 'tablet':
        return this.props.tablet !== null ? this.props.tablet : this.props.mobile;
      case 'tablet-landscape':
        return this.props.tablet !== null ? this.props.tablet : this.props.mobile;
      case 'mobile':
        return this.props.mobile;
      case 'mobile-landscape':
        return this.props.mobile;
      default:
        return this.props.mobile;
    }
  }

  render() {
    return (
      <div data-layout >
        { this.renderLayout() }
      </div>
    );
  }
  
}

AdaptiveLayout.events = ['resize', 'orientationchange', 'load'];

AdaptiveLayout.defaultProps = {
  mobile: null,
  tablet: null,
  desktop: null
};

AdaptiveLayout.propTypes = {
  mobile: PropTypes.node,
  tablet: PropTypes.node,
  desktop: PropTypes.node
};
