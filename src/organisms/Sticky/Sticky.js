import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sticky as ReactSticky, StickyContainer as ReactStickyContainer } from 'react-sticky';
import './Sticky.styl';

const STICKY_SHADOW = 7;
const STICKY_TIMEOUT = 400;

export class Sticky extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolling: null,
      direction: 'bottom',
      lastPos: 0
    };

    this.timeout = null;
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  componentDidMount() {
    if (this.props.hideOnScrollUp) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }
  componentWillUnmount() {
    if (this.props.hideOnScrollUp) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll(event) {
    // if there is already a timeout in process cancel it
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ scrolling: false });
    }, STICKY_TIMEOUT);

    if (this.state.scrollStatus !== true) {
      this.setState({ scrolling: true });
    }

    if (this.state.lastPos > event.currentTarget.scrollY) {
      this.setState({
        direction: 'top',
        lastPos: event.currentTarget.scrollY
      });
    } else if (this.state.lastPos < event.currentTarget.scrollY) {
      this.setState({
        direction: 'bottom',
        lastPos: event.currentTarget.scrollY
      });
    }
  }

  render() {
    return (
      <ReactSticky
        disableCompensation={this.props.disabled}
        topOffset={-this.props.offsetTop}
        bottomOffset={typeof this.props.offsetBottom === 'undefined'
          ? this.props.offsetTop
          : this.props.offsetBottom
        }
      >
        {
          ({
            style,
            isSticky,
            wasSticky,
            calculatedHeight
          }) => {
            const classes = ['dc-sticky'];
            const { props, state } = this;

            if (!props.disabled && isSticky !== wasSticky) {
              props.onStickinessChanged(isSticky, wasSticky);
            }

            if (!props.disabled && style.position === 'fixed') {
              classes.push('dc-sticky-sticked');
              if (style.top <= 0) {
                style.top += props.offsetTop;
              }
            }

            if (this.props.hideOnScrollUp) {
              if (state.direction === 'top' && isSticky) {
                style.top = -(calculatedHeight + STICKY_SHADOW);
              }

              if (state.direction === 'top' && !state.scrolling) {
                style.top = 0;
              }
            }

            return (
              <div className={classes.join(' ')} style={props.disabled ? {} : { ...style }}>
                {props.children}
              </div>
            );
          }
        }
      </ReactSticky>
    );
  }
}

Sticky.displayName = 'Sticky';

Sticky.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  disabled: PropTypes.bool,
  hideOnScrollUp: PropTypes.bool,
  offsetBottom: PropTypes.number,
  offsetTop: PropTypes.number,
  onStickinessChanged: PropTypes.func
};

Sticky.defaultProps = {
  disabled: false,
  hideOnScrollUp: false,
  offsetBottom: undefined,
  offsetTop: 0,
  onStickinessChanged: () => {}
};

export default Sticky;

export function StickyContainer(props) {
  const classes = ['dc-sticky-container'];

  if (props.className) {
    classes.push(props.className.split(' '));
  }

  return (
    <ReactStickyContainer className={classes.join(' ')}>
      {props.children}
    </ReactStickyContainer>
  );
}

StickyContainer.displayName = 'StickyContainer';

StickyContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string
};

StickyContainer.defaultProps = {
  className: ''
};
