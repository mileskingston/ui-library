import React from 'react';
import PropTypes from 'prop-types';
import { getTransitionEndProperty } from './transition';
import './SlideWrapper.styl';


class SlideWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.$html = (typeof window !== 'undefined') ? document.querySelector('html') : null;
    this.$wrapper = null;
  }

  componentDidMount() {
    this.$html.classList.add('slide-wrapper-hidden-fixed-content');
    // if this browser supports transitionEnd event
    if (typeof window !== 'undefined' && getTransitionEndProperty() !== null) {
      this.$wrapper.addEventListener(getTransitionEndProperty(), () => {
        if (!this.props.sliding) {
          this.$html.classList.add('slide-wrapper-hidden-fixed-content');
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof window === 'undefined') return;
    if (this.props.sliding !== nextProps.sliding) {
      if (nextProps.sliding) {
        this.$html.classList.remove('slide-wrapper-hidden-fixed-content');
      } else if (getTransitionEndProperty() === null) {
        // if this browser doesn't support transitionEnd event
        setTimeout(() => {
          this.$html.classList.add('slide-wrapper-hidden-fixed-content');
        }, 300);
      }
    }
  }

  render() {
    const { children, wrapperName, sliding } = this.props;
    if (typeof window !== 'undefined') {
      if (sliding) {
        this.$html.classList.add('slide-wrapper-open');
      } else {
        this.$html.classList.remove('slide-wrapper-open');
      }
    }

    return (
      <div
        data-component="SlideWrapper"
        data-element={wrapperName}
        ref={(c) => { this.$wrapper = c; }}
      >
        {children}
      </div>
    );
  }
}

SlideWrapper.displayName = 'SlideWrapper';

SlideWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  sliding: PropTypes.bool,
  wrapperName: PropTypes.string
};

SlideWrapper.defaultProps = {
  sliding: false,
  wrapperName: 'slide-wrapper'
};

export default SlideWrapper;
