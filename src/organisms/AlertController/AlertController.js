import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './AlertController.styl';

const ESCAPE_KEY = 27;

class AlertController extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isAlertVisible: false
    };

    this.toggle = this.toggle.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeOnEscape = this.closeOnEscape.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.closeOnEscape);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeOnEscape);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  open() {
    this.setState({
      isAlertVisible: true
    });

    this.props.onAlertOpen();
  }

  close() {
    this.setState({
      isAlertVisible: false
    });

    this.props.onAlertClose();
  }

  toggle(event) {
    if (event) {
      event.preventDefault();
    }

    this[this.state.isAlertVisible ? 'close' : 'open']();
  }

  closeOnEscape(event) {
    if (event.keyCode === ESCAPE_KEY) {
      this.close();
    }
  }

  handleClickOutside(event) {
    if (this.wrapperElement && !this.wrapperElement.contains(event.target)) {
      this.close();
    }
  }

  render() {
    const { props, state } = this;
    const classes = ['dc-alert-controller'];

    if (props.isFloating) {
      classes.push('dc-alert-controller--floating');
    }

    if (props.align) {
      classes.push(`dc-alert-controller--align-${props.align}`);
    }

    return (
      <span
        className={classes.join(' ')}
        ref={(el) => { this.wrapperElement = el; }}
      >
        <a
          href=""
          className="dc-alert-controller__trigger"
          onClick={this.toggle}
          data-qa={props.qa}
        >
          {props.children}

          {props.showArrow && state.isAlertVisible &&
            <span className="dc-alert__arrow dc-alert__arrow--top" />
          }
        </a>

        {state.isAlertVisible &&
          <div className="dc-alert-controller__alert">
            {props.alert}
          </div>
        }
      </span>
    );
  }

}

AlertController.displayName = 'AlertController';

AlertController.propTypes = {
  /**
   * The component that will be displayed as alert when children element is clicked
   */
  alert: PropTypes.node.isRequired,

  /**
   * The trigger element for alert
   */
  children: PropTypes.node.isRequired,

  align: PropTypes.oneOf(['left', 'center', 'right']),
  isFloating: PropTypes.bool,
  showArrow: PropTypes.bool,
  qa: PropTypes.string,
  onAlertOpen: PropTypes.func,
  onAlertClose: PropTypes.func
};

AlertController.defaultProps = {
  align: 'left',
  isFloating: false,
  showArrow: false,
  qa: undefined,
  onAlertOpen: () => {},
  onAlertClose: () => {}
};

export default AlertController;
