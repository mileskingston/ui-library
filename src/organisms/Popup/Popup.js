import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toggleOverflow } from '../../helpers';
import Close from '../Close/Close';
import './Popup.styl';

class Popup extends Component {

  constructor(props) {
    super(props);

    this.ESCAPE_KEY = 27;
    this.closeOnEscape = this.closeOnEscape.bind(this);
  }

  componentDidMount() {
    toggleOverflow('body', true);
    document.addEventListener('keydown', this.closeOnEscape);

    const backdrop = document.createElement('div');
    backdrop.id = 'popup-backdrop';
    backdrop.className = 'dc-popup-backdrop';

    if (!this.backdropElement) {
      this.backdropElement = document.body.appendChild(backdrop);
    }
  }

  componentWillUnmount() {
    toggleOverflow('body', false);
    document.removeEventListener('keydown', this.closeOnEscape);

    if (this.backdropElement) {
      this.backdropElement.parentNode.removeChild(this.backdropElement);
    }
  }

  closeOnEscape(event) {
    if (event.keyCode === this.ESCAPE_KEY) {
      this.props.onClose();
    }
  }

  render() {
    const { props } = this;
    const classes = [
      'dc-popup-overlay',
      `dc-popup-${props.isVisible ? 'visible' : 'hidden'}`,
      props.optionalClasses
    ];

    return (
      <div className={classes.join(' ')} onClick={props.onClose}>
        <div className="dc-popup" onClick={(event) => { event.stopPropagation(); }}>
          {!props.hideHeaderBar &&
            <div className="dc-popup-header">
              <div className="dc-popup-title">{props.title}</div>
              <Close onClose={props.onClose} />
            </div>
          }
          <div className="dc-popup-content">
            {props.children}
          </div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  hideHeaderBar: PropTypes.bool,
  optionalClasses: PropTypes.string
};

Popup.defaultProps = {
  isVisible: false,
  onClose: undefined,
  hideHeaderBar: false,
  optionalClasses: ''
};

export default Popup;
