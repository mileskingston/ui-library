import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { translations, settings, replacePlaceholders } from '../../../../config';
import { Checkbox, ExpandableText, FormItem, FormSimple, FormSubmit, Icon } from '../../../../';
import { EMAIL_RECOGNITION_TIMEOUT } from '../../constants';
import './LoginForm.styl';

class LoginForm extends FormSimple {

  constructor(props) {
    super(props);

    this.handleForgotPasswordClick = this.handleForgotPasswordClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
    this.handleEmailUpdateImmediate = this.handleEmailUpdateImmediate.bind(this);
  }

  handleForgotPasswordClick(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.onForgotPasswordClick();
    this.validate();
  }

  handleSubmit(event) {
    const { props } = this;
    const formData = this.collectFormData();

    if (event) {
      event.preventDefault();
    }

    formData.rememberMe = props.rememberMe;

    if (props.productId) {
      formData.productId = props.productId;
    }

    props.handleSubmit(formData);
  }

  handleEmailUpdate(email, isValid) {
    const { props } = this;

    if (!props.autoComplete) {
      if (this.loginPassword) {
        this.loginPassword.updateValue('');
      }
    }

    if (this.loginButton) {
      this.loginButton.setState({ disabled: false });
    }

    props.handleEmailUpdate(email, isValid);
  }

  handleEmailUpdateImmediate(email, isValid) {
    if (this.loginButton) {
      this.loginButton.setState({ disabled: true });
    }

    this.props.handleEmailUpdateImmediate(email, isValid);
  }

  render() {
    const { props } = this;

    return (
      <form className="dc-form-sign-in" onSubmit={this.handleSubmit}>

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
          ref={(input) => { this.loginPassword = input; }}
          name="password"
          type="password"
          label={translations.password}
          onValueUpdateImmediate={props.onPasswordUpdate}
          passwordShowHide
          isRequired
          autoComplete="password"
          autoFocus={props.autoFocusToPassword}
          hint={
            <a
              data-interaction="quick-signin-forgot-password"
              href="#forgottenPassword"
              className="dc-link dc-link-forgot-password"
              onClick={this.handleForgotPasswordClick}
            >
              {translations.forgotten_your_password}
            </a>
          }
        />

        {settings.is_remember_me_enabled === true &&
          <div className="dc-remember-me-wrapper">
            <Checkbox
              small
              checked={props.rememberMe === true}
              label={(
                <Fragment>
                  {translations.quick_account_remember_me_label}&nbsp;
                </Fragment>
              )}
              onCheck={props.toggleRememberMe}
              interaction="remember me"
            />
            <ExpandableText
              className="dc-remember-me__expandable-text"
              textLess={(
                <Fragment>
                  {translations.quick_account_remember_me_toggle}
                  <Icon icon="ChevronRight" rotate={270} />
                </Fragment>
              )}
              textMore={(
                <Fragment>
                  {translations.quick_account_remember_me_toggle}
                  <Icon icon="ChevronRight" rotate={90} />
                </Fragment>
              )}
              renderer={ExpandableText.blockRenderer}
            >
              {replacePlaceholders(
                translations.quick_account_remember_me_description,
                { '[DAYS_COUNT]': settings.remember_me_days_count }
              )}
            </ExpandableText>
          </div>
        }

        <FormSubmit
          ref={(button) => { this.loginButton = button; }}
          name="sign_in"
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

LoginForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  autoFocusToPassword: PropTypes.bool,
  buttonLabel: PropTypes.string,
  email: PropTypes.string,
  inProgress: PropTypes.bool,
  productId: PropTypes.string,
  rememberMe: PropTypes.bool,
  handleEmailUpdate: PropTypes.func,
  handleEmailUpdateByUser: PropTypes.func,
  handleEmailUpdateImmediate: PropTypes.func,
  handleSubmit: PropTypes.func,
  toggleRememberMe: PropTypes.func,
  onForgotPasswordClick: PropTypes.func,
  onPasswordUpdate: PropTypes.func
};

LoginForm.defaultProps = {
  children: undefined,
  autoFocusToPassword: false,
  buttonLabel: 'Sign in',
  email: undefined,
  inProgress: false,
  productId: undefined,
  rememberMe: false,
  handleEmailUpdate: () => {},
  handleEmailUpdateByUser: () => {},
  handleEmailUpdateImmediate: () => {},
  handleSubmit: () => {},
  toggleRememberMe: () => {},
  onForgotPasswordClick: () => {},
  onPasswordUpdate: () => {}
};

export default LoginForm;
