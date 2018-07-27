import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translations, constants, saveBitmasks } from '../../config';
import { postJSON } from '../../helpers';
import FormItem from '../FormItem/FormItem';
import './EmailRecognition.styl';

/**
 * @deprecated Use QuickAccount application instead
 */
class EmailRecognition extends Component {

  constructor(props) {
    super(props);

    this.TYPING_TIMEOUT = 1500;
    this.SUBMIT_TURN_ON = 'on';
    this.SUBMIT_TURN_OFF = 'off';

    this.state = {
      email: props.email || '',
      inProgress: false
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.handleEmailUpdateImmediate = this.handleEmailUpdateImmediate.bind(this);
  }

  updateEmail(email, isValid) {
    const { props, state } = this;

    if (state.email === email) {
      return;
    }

    this.setState({ email }, () => {
      props.onEmailUpdate(email);

      if (isValid) {
        this.checkEmail();
      } else {
        props.onResult();
      }
    });
  }

  toggleSubmit(turnOn) {
    if (this.emailRecognitionTurnSubmitOnOff) {
      this.emailRecognitionTurnSubmitOnOff.updateValue(
        turnOn ? this.SUBMIT_TURN_ON : this.SUBMIT_TURN_OFF
      );
    }
  }

  checkEmail() {
    const { props, state } = this;
    const bitmask = saveBitmasks.EMAIL_RECOGNITION;

    this.setState({ inProgress: true });

    postJSON(bitmask, { email: state.email })
      .then((response) => {
        this.setState({ inProgress: false });
        this.toggleSubmit(true);

        if (response.status === constants.SUCCESS_STATUS) {
          props.onResult(
            response.formSubmitFeedback[bitmask].emailRecognized,
            response.formSubmitFeedback[bitmask].firstName
          );
        } else {
          props.onError(response.formSubmitFeedback[bitmask].formMessages);
        }

        return response;
      })
      .catch(() => {
        this.setState({ inProgress: false });
        this.toggleSubmit(true);
        props.onError(translations.quick_account_response_error);
      });
  }

  handleEmailUpdateImmediate(email, isValid) {
    this.props.onError('');
    this.toggleSubmit(false);

    const isDeleting = this.state.email.indexOf(email) === 0 &&
      this.state.email.length > email.length;

    if (this.props.autocompleteEnabled && !isDeleting) {
      this.updateEmail(email, isValid);
    }
  }

  render() {
    const { props, state } = this;

    return (
      <div className="dc-email-recognition">
        <FormItem
          ref={(input) => { this.emailRecognitionTurnSubmitOnOff = input; }}
          name="emailRecognitionAllowSubmit"
          type="hidden"
          customFormat={new RegExp(this.SUBMIT_TURN_ON)}
        />
        <FormItem
          autoFocus={props.autoFocus}
          name="email"
          type="email"
          value={state.email}
          label={translations.email}
          errorMessage={translations.email_validation_error}
          typingDelay={this.TYPING_TIMEOUT}
          inProgress={state.inProgress}
          isRequired
          onValueUpdate={this.updateEmail}
          onValueUpdatedByUser={props.onUserTyped}
          onValueUpdateImmediate={this.handleEmailUpdateImmediate}
        />
      </div>
    );
  }
}

EmailRecognition.propTypes = {
  autocompleteEnabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  email: PropTypes.string,
  onError: PropTypes.func,
  onResult: PropTypes.func,
  onEmailUpdate: PropTypes.func,
  onUserTyped: PropTypes.func
};

EmailRecognition.defaultProps = {
  autocompleteEnabled: true,
  autoFocus: false,
  email: '',
  onError: () => {},
  onResult: () => {},
  onEmailUpdate: () => {},
  onUserTyped: () => {}
};

export default EmailRecognition;
