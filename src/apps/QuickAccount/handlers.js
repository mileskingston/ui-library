import { mobileOS } from '../../helpers';
import {
  constants,
  postJSON,
  saveBitmasks,
  translations
} from '../../../';

import {
  VIEW_LOGIN,
  VIEW_REGISTRATION,
  VIEW_RESET_PASSWORD
} from './constants';

export function handleForgotPasswordClick({ setView, setResultMessage: clearResultMessage }) {
  return (event) => {
    if (event) {
      event.preventDefault();
    }

    setView(VIEW_RESET_PASSWORD);
    clearResultMessage('');
  };
}

export function setResultMessage({ setMessage }) {
  return (message, type = 'negative', icon = null) => {
    setMessage({ message, type, icon });
  };
}

export function handlePopupClose({ onPopupClose, reloadRequired }) {
  return (event) => {
    if (event) {
      event.preventDefault();
    }

    if (typeof window !== 'undefined' && mobileOS.isIOS) {
      document.body.style.position = 'static';
    }

    if (reloadRequired) {
      window.location.reload();
    }

    onPopupClose();
  };
}

export function emailRecognition(
  {
    setEmail,
    setRecognitionInProgress,
    setUserName,
    setView,
    setResultMessage: updateResultMessage,
    email
  }
) {
  return (newEmail, isValid) => {
    if (email !== newEmail) {
      setEmail(newEmail);

      if (isValid) {
        const bitmask = saveBitmasks.EMAIL_RECOGNITION;

        setRecognitionInProgress(true);

        postJSON(bitmask, { email: newEmail })
          .then((response) => {
            setRecognitionInProgress(false);

            if (response.status === constants.SUCCESS_STATUS) {
              const feedback = response.formSubmitFeedback[bitmask];

              setUserName(feedback.firstName);
              setView(feedback.emailRecognized ? VIEW_LOGIN : VIEW_REGISTRATION);
            } else {
              updateResultMessage(response.formSubmitFeedback[bitmask].formMessages);
            }

            return response;
          })
          .catch(() => {
            setRecognitionInProgress(false);
            updateResultMessage(translations.quick_account_response_error);
          });
      } else {
        setUserName('');
      }
    }
  };
}

export function emailRecognitionImmediate(
  {
    setResultMessage: clearResultMessage,
    emailRecognition: handleEmailRecognition,
    autoComplete,
    email
  }
) {
  return (newEmail, isValid) => {
    clearResultMessage('');

    const isDeleting = email.indexOf(newEmail) === 0 &&
      email.length > newEmail.length;

    if (autoComplete && !isDeleting) {
      handleEmailRecognition(newEmail, isValid);
    }

  };
}
