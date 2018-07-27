import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../molecules/Tooltip/Tooltip';
import staticTimeoutResolver from '../../helpers/staticTimeoutResolver';

import './Notification.styl';

/**
 * Notification component utilizes [Tooltip](/#!/Tooltip) component.
 *
 * All props except `display`, `floating` and `fadeInOut` are passed to `Tooltip` component.
 * `Notification` component ads public API to show and hide Tooltip.
 */
class Notification extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      ...props,
      display: false,
      fadeInOut: true,
      floating: true,
      style: ['small', 'compact'].indexOf(props.style) > -1
        ? props.style
        : 'small'
    };

    this.autoHideTimeout = null;
  }

  /**
   * Set `props` to children Tooltip component and display the Tooltip.
   *
   * @public
   * @param {Object} props
   * @param {boolean} autoHide
   */
  show(props, autoHide = this.props.autoHide) {
    this.setState({
      ...props,
      display: true
    });

    if (autoHide) {
      if (this.autoHideTimeout) {
        clearTimeout(this.autoHideTimeout);
      }

      this.autoHideTimeout = setTimeout(
        this.hide.bind(this),
        staticTimeoutResolver(props.content || this.state.content)
      );
    }
  }

  /**
   * Hide the children Tooltip component
   *
   * @public
   * @param {Object} props
   */
  hide(props) {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }

    this.setState({
      ...props,
      display: false
    });
  }

  render() {
    const {
      props: {
        style
      },
      state: {
        content
      }
    } = this;

    return (
      <div className="dc-notification" style={style}>
        <Tooltip {...this.state}>
          {content}
        </Tooltip>
      </div>
    );
  }

}

Notification.displayName = 'Notification';

Notification.propTypes = {
  autoHide: PropTypes.bool,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  style: PropTypes.shape({})
};

Notification.defaultProps = {
  autoHide: true,
  content: '',
  style: {}
};

export default Notification;
