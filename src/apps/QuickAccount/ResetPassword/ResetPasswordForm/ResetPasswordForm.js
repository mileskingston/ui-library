import React from 'react';
import PropTypes from 'prop-types';
import { translations } from '../../../../config';
import { FormItem, FormSubmit, FormSimple } from '../../../../';
import './ResetPasswordForm.styl';

class FormResetPassword extends FormSimple {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onReturnLinkClick = this.onReturnLinkClick.bind(this);
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.handleSubmit(this.collectFormData());
  }

  onReturnLinkClick(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.onReturnLinkClick();
  }

  render() {
    const { props } = this;

    return (
      <form className="dc-reset-password" onSubmit={this.handleSubmit}>
        <p className="dc-reset-password-intro">
          {translations.forgotten_password_intro}
        </p>

        <FormItem
          name="email"
          type="email"
          value={props.email}
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

        {props.viewBackLink &&
          <div className="dc-reset-password-return-link">
            <a className="dc-link" onClick={this.onReturnLinkClick} href="#signIn">
              {translations.return_to_sign_in}
            </a>
          </div>
        }
      </form>
    );
  }
}

FormResetPassword.propTypes = {
  email: PropTypes.string,
  inProgress: PropTypes.bool,
  viewBackLink: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onReturnLinkClick: PropTypes.func
};

FormResetPassword.defaultProps = {
  email: '',
  inProgress: false,
  viewBackLink: false,
  handleSubmit: () => {},
  onReturnLinkClick: () => {}
};

export default FormResetPassword;
