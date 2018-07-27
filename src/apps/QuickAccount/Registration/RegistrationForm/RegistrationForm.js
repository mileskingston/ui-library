import React from 'react';
import PropTypes from 'prop-types';
import { blacklists, settings, translations } from '../../../../config';
import { Checkbox, FormItem, FormSimple, FormSubmit } from '../../../../';
import { EMAIL_RECOGNITION_TIMEOUT } from '../../constants';
import './RegistrationForm.styl';

class RegistrationForm extends FormSimple {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
    this.handleEmailUpdateImmediate = this.handleEmailUpdateImmediate.bind(this);
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    const { props } = this;
    const formData = this.collectFormData();

    formData.notifyOnPriceDrop = props.notifyOnPriceDrop;

    if (props.productId) {
      formData.productId = props.productId;
    }

    props.handleSubmit(formData);
  }

  handleEmailUpdate(email, isValid) {
    const { props } = this;

    props.setNotifyOnPriceDrop(false);

    if (!props.autoComplete) {
      if (this.registrationPassword) {
        this.registrationPassword.updateValue('');
      }

      if (this.registrationPasswordConfirmation) {
        this.registrationPasswordConfirmation.updateValue('');
      }
    }

    if (this.registrationButton) {
      this.registrationButton.setState({ disabled: false });
    }

    props.handleEmailUpdate(email, isValid);
  }

  handleEmailUpdateImmediate(email, isValid) {
    if (this.registrationButton) {
      this.registrationButton.setState({ disabled: true });
    }

    this.props.handleEmailUpdateImmediate(email, isValid);
  }

  render() {
    const { props } = this;
    const isPriceDropEnabled = settings.is_price_drop_enabled;

    return (
      <form className="dc-form-registration" onSubmit={this.handleSubmit}>

        <FormItem
          autoFocus={props.autoFocus}
          name="email"
          type="email"
          value={props.email}
          label={translations.email}
          errorMessage={translations.email_validation_error}
          typingDelay={EMAIL_RECOGNITION_TIMEOUT}
          inProgress={props.recognitionInProgress}
          onValueUpdate={this.handleEmailUpdate}
          onValueUpdatedByUser={props.handleEmailUpdateByUser}
          onValueUpdateImmediate={this.handleEmailUpdateImmediate}
          isRequired
        />

        <FormItem
          ref={(input) => { this.registrationPassword = input; }}
          name="newPassword"
          type="password"
          label={translations.create_password_label}
          minLength={settings.weakMin}
          psiSettings={settings}
          blacklist={blacklists.PASSWORD_BLACKLIST}
          mustBeMatchedBy="confirmPassword"
          onValueUpdateImmediate={props.onPasswordUpdate}
          autoComplete="new-password"
          autoFocus={props.autoFocusToPassword}
          passwordShowHide
          showStrength
          isRequired
        />

        <FormItem
          ref={(input) => { this.registrationPasswordConfirmation = input; }}
          name="confirmPassword"
          type="password"
          label={translations.confirm_password_label}
          errorMessage={translations.confirm_password_error_message}
          minLength={settings.weakMin}
          blacklist={blacklists.PASSWORD_BLACKLIST}
          mustMatch="newPassword"
          onValueUpdateImmediate={props.onPasswordUpdate}
          autoComplete="new-password"
          passwordShowHide
          isRequired
        />

        {isPriceDropEnabled &&
          <Checkbox
            small
            checked={props.notifyOnPriceDrop ? true : undefined}
            label={translations.quick_account_notify_on_price_drop}
            onCheck={props.toggleNotifyOnPriceDrop}
          />
        }

        <FormSubmit
          ref={(button) => { this.registrationButton = button; }}
          name="registration"
          label={props.buttonLabel}
          labelInProgress={props.buttonLabel}
          style="full"
          workInProgress={props.inProgress}
          disabled={props.recognitionInProgress}
        />

        {props.children}

      </form>
    );
  }
}

RegistrationForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  autoComplete: PropTypes.bool,
  autoFocusToPassword: PropTypes.bool,
  buttonLabel: PropTypes.string,
  email: PropTypes.string,
  inProgress: PropTypes.bool,
  notifyOnPriceDrop: PropTypes.bool,
  productId: PropTypes.string,
  handleEmailUpdate: PropTypes.func,
  handleEmailUpdateByUser: PropTypes.func,
  handleEmailUpdateImmediate: PropTypes.func,
  setNotifyOnPriceDrop: PropTypes.func,
  toggleNotifyOnPriceDrop: PropTypes.func
};

RegistrationForm.defaultProps = {
  children: undefined,
  autoComplete: true,
  autoFocusToPassword: false,
  buttonLabel: 'Register',
  email: undefined,
  inProgress: false,
  notifyOnPriceDrop: false,
  productId: undefined,
  handleEmailUpdate: () => {},
  handleEmailUpdateByUser: () => {},
  handleEmailUpdateImmediate: () => {},
  setNotifyOnPriceDrop: () => {},
  toggleNotifyOnPriceDrop: () => {}
};

export default RegistrationForm;
