import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translations } from '../../config';
import FormItem from '../FormItem/FormItem';
import FormSubmit from '../FormSubmit/FormSubmit';
import './ResetPassword.styl';

/**
 * @deprecated Use QuickAccount application instead
 */
class ResetPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: props.email || ''
    };

    this.handleReturnLinkClick = this.handleReturnLinkClick.bind(this);
  }

  handleReturnLinkClick(event) {
    event.preventDefault();

    this.props.onReturnLinkClick();
  }

  render() {
    const { props, state } = this;

    return (
      <div className="dc-reset-password">
        <p className="dc-reset-password-intro">
          {translations.forgotten_password_intro}
        </p>

        <FormItem
          name="emailForgotten"
          type="email"
          value={state.email}
          label={translations.email}
          errorMessage={translations.email_validation_error}
          isRequired
          onValueUpdate={this.updateEmail}
        />

        <FormSubmit
          name="resetPassword"
          label={translations.reset_password_button}
          labelInProgress={translations.reset_password_button}
          style="full"
          workInProgress={props.inProgress}
        />

        <div className="dc-reset-password-return-link">
          <a className="dc-link" onClick={this.handleReturnLinkClick} href="#signIn">
            {translations.return_to_sign_in}
          </a>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  email: PropTypes.string,
  inProgress: PropTypes.bool,
  onReturnLinkClick: PropTypes.func
};

ResetPassword.defaultProps = {
  email: '',
  inProgress: false,
  onReturnLinkClick: () => {}
};

export default ResetPassword;
