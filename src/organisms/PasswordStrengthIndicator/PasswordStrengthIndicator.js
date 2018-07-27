import PropTypes from 'prop-types';
import React, { Component } from 'react';
import translations from '../../config/translations';
import './PasswordStrengthIndicator.styl';

class PasswordStrengthIndicator extends Component {

  constructor(props) {
    super(props);

    /**
     * -1: empty or too short
     *  0: on blacklist
     *  1: weak
     *  2: good
     *  3: strong
     *  4: very strong
     */
    this.state = {
      strength: -1,
      message: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      this.evaluateStrength(nextProps.password)
    );
  }

  evaluateStrength(password) {
    const newState = this.state;
    const { settings, blacklist } = this.props;
    const reWeakNumeric = new RegExp(`^[0-9]{'${settings.weakMin},}$`);
    const reWeakAlphaNumeric = new RegExp(`^[a-zA-Z0-9\\W_]{${settings.weakMin},}$`);
    const reGood = new RegExp(`^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{${settings.goodMin},}$`);
    const reStrong = new RegExp(
      `^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9\\W_]).{${settings.strongMin},}$`
    );
    const reVeryStrong = new RegExp(
      `^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\\W_]).{${settings.strongMin},}$`
    );

    // Password is empty
    if (password === '') {
      newState.strength = -1;
      newState.message = '';
      return newState;
    }

    // Password is too short
    if (password.length < settings.weakMin) {
      newState.strength = -1;
      newState.message = translations.psi_too_short;
      return newState;
    }

    // Password is on blacklist
    if (blacklist.indexOf(password.toLowerCase()) >= 0) {
      newState.strength = 0;
      newState.message = translations.psi_not_available;
      return newState;
    }

    // Password is weak and numeric or alphanumeric
    if (reWeakNumeric.test(password) || reWeakAlphaNumeric.test(password)) {
      newState.strength = 1;
      newState.message = translations.psi_add_capitals_and_numbers;
    }

    // Password is good
    if (reGood.test(password)) {
      newState.strength = 2;
      newState.message = translations.psi_good;
    }

    // Password is strong
    if (reStrong.test(password)) {
      newState.strength = 3;
      newState.message = translations.psi_strong;
    }

    // Password is very strong
    if (reVeryStrong.test(password)) {
      newState.strength = 4;
      newState.message = translations.psi_very_strong;
    }

    return newState;
  }

  render() {
    const { maxStrength } = this.props;
    const { strength } = this.state;

    const indicators = [];
    const psiClasses = ['dc-psi'];

    if (strength >= 0) {
      psiClasses.push(`dc-psi-strength-${strength}`);
    }

    for (let i = 0; i < maxStrength; i++) {
      indicators.push(
        // eslint-disable-next-line react/self-closing-comp
        <span className="dc-psi-bar-indicator" key={i}> </span>
      );
    }
    return (
      <div data-component="PasswordStrengthIndicator" className={psiClasses.join(' ')}>
        <div className="dc-psi-bar">
          {indicators}
        </div>
        {this.state.message &&
          <div
            className="dc-psi-message"
            dangerouslySetInnerHTML={{ __html: this.state.message }}
          />
        }
      </div>
    );
  }
}

PasswordStrengthIndicator.propTypes = {
  settings: PropTypes.shape({
    weakMin: PropTypes.number,
    goodMin: PropTypes.number,
    strongMin: PropTypes.number
  }).isRequired,
  password: PropTypes.string.isRequired,
  blacklist: PropTypes.arrayOf(PropTypes.string),
  maxStrength: PropTypes.number
};

PasswordStrengthIndicator.defaultProps = {
  maxStrength: 4,
  blacklist: []
};

export default PasswordStrengthIndicator;
