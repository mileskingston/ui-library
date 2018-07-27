import React from 'react';
import { translations } from '../../config';
import Benefits from '../../organisms/Benefits/Benefits';
import EnterEmail from './EnterEmail/EnterEmail';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import ResetPassword from './ResetPassword/ResetPassword';
import SaveForLaterConfirmation from './SaveForLaterConfirmation/SaveForLaterConfirmation';
import ResultMessage from './ResultMessage/ResultMessage';

import {
  VIEW_EMAIL_RECOGNITION,
  VIEW_LOGIN,
  VIEW_LOGIN_CONFIRMATION,
  VIEW_REGISTRATION,
  VIEW_REGISTRATION_CONFIRMATION,
  VIEW_RESET_PASSWORD,
  VIEW_RESET_PASSWORD_CONFIRMATION
} from './constants';

export default (
  {
    autoComplete,
    email,
    recognitionInProgress,
    message,
    product,
    userName,
    view,

    setView,
    setAutoComplete,
    setReloadRequired,
    setResultMessage,

    emailRecognition,
    emailRecognitionImmediate,
    handleForgotPasswordClick,
    handlePopupClose,
    onRegistrationResult,
    onRegistrationSuccess,
    onSignInResult,
    onSignInSuccess
  }
) => {
  let title = '';
  const children = [];
  const saveForLater = product.productId !== undefined;

  children.push(
    <ResultMessage result={message} key="resultMessage" />
  );

  switch (view) {
    case VIEW_EMAIL_RECOGNITION: {
      title = translations.sign_in_title;

      children.push(
        <EnterEmail
          key="enterEmail"
          email={email}
          recognitionInProgress={recognitionInProgress}
          autoFocus
          handleEmailUpdateByUser={() => setAutoComplete(false)}
          handleEmailUpdate={emailRecognition}
          handleEmailUpdateImmediate={emailRecognitionImmediate}
        >
          <Benefits
            list={translations.quick_account_benefits_list.split('|')}
            title="Why create account?"
            arrow="top"
            viewInTooltip
          />
        </EnterEmail>
      );
      break;
    }

    case VIEW_LOGIN: {
      if (userName) {
        title = translations.sign_in_name.replace('[name]', userName);
      } else {
        title = translations.sign_in_please;
      }

      children.push(
        <Login
          key="login"
          autoComplete={autoComplete}
          autoFocusToPassword
          buttonLabel={saveForLater
            ? translations.sign_in_and_save_item : translations.sign_in_button}
          email={email}
          productId={product.productId}
          recognitionInProgress={recognitionInProgress}
          handleEmailUpdateByUser={() => setAutoComplete(false)}
          handleEmailUpdate={emailRecognition}
          handleEmailUpdateImmediate={emailRecognitionImmediate}
          onPasswordUpdate={() => setResultMessage('')}
          onForgotPasswordClick={handleForgotPasswordClick}
          setResultMessage={setResultMessage}
          setReloadRequired={setReloadRequired}
          onSignInResult={onSignInResult}
          onSignInSuccess={({ message: msg, type, icon }, rememberMe) => {
            setResultMessage(msg, type, icon);

            if (saveForLater) {
              setView(VIEW_LOGIN_CONFIRMATION);
            } else {
              onSignInSuccess(rememberMe);
            }
          }}
        />
      );
      break;
    }

    case VIEW_LOGIN_CONFIRMATION: {
      title = translations.sign_in_confirmation_title;

      children.push(
        <SaveForLaterConfirmation
          key="loginConfirmation"
          message={translations.saving_success}
          product={product}
          onPopupClose={handlePopupClose}
        />
      );
      break;
    }

    case VIEW_REGISTRATION: {
      title = translations.register_friend;

      children.push(
        <Registration
          key="registration"
          autoComplete={autoComplete}
          autoFocusToPassword
          buttonLabel={product.productId
            ? translations.register_and_save_item : translations.register_button}
          email={email}
          productId={product.productId}
          recognitionInProgress={recognitionInProgress}
          handleEmailUpdateByUser={() => setAutoComplete(false)}
          handleEmailUpdate={emailRecognition}
          handleEmailUpdateImmediate={emailRecognitionImmediate}
          onPasswordUpdate={() => setResultMessage('')}
          setResultMessage={setResultMessage}
          setReloadRequired={setReloadRequired}
          onRegistrationResult={onRegistrationResult}
          onRegistrationSuccess={({ message: msg, type, icon }) => {
            setResultMessage(msg, type, icon);

            if (saveForLater) {
              setView(VIEW_REGISTRATION_CONFIRMATION);
            } else {
              onRegistrationSuccess();
            }
          }}
        />
      );
      break;
    }

    case VIEW_REGISTRATION_CONFIRMATION: {
      title = translations.registration_confirmation_title;

      children.push(
        <SaveForLaterConfirmation
          key="registrationConfirmation"
          product={product}
          viewDetails
          onPopupClose={handlePopupClose}
        />
      );
      break;
    }

    case VIEW_RESET_PASSWORD: {
      title = translations.forgotten_password;

      children.push(
        <ResetPassword
          key="resetPassword"
          email={email}
          viewBackLink
          onReturnLinkClick={() => setView(VIEW_LOGIN)}
          onResetPasswordSuccess={() => setView(VIEW_RESET_PASSWORD_CONFIRMATION)}
          setResultMessage={setResultMessage}
        />
      );
      break;
    }

    case VIEW_RESET_PASSWORD_CONFIRMATION: {
      title = translations.forgotten_password;
      children.push(
        <div className="dc-confirmation-continue-link dc-text-center" key="resetConfirmation">
          <a href="#close" className="dc-link" onClick={handlePopupClose}>
            {translations.continue_shopping}
          </a>
        </div>
      );
      break;
    }

    default: {
      break;
    }
  }

  return {
    title,
    children,
    optionalClasses: 'dc-quick-account-popup dc-border-box',
    onClose: handlePopupClose
  };
};
