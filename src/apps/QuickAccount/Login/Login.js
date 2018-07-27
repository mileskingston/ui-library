import { withHandlers, compose } from 'recompose';
import stateSetup from '../stateSetup';
import { getResultFromRespose, extractMessages } from '../helpers';
import {
  constants,
  paths,
  postJSON,
  saveBitmasks,
  stripTags,
  translations
} from '../../../';
import {
  EVENT_INVALID_LOGIN,
  STATUS_SUCCESS,
  STATUS_FAILED
} from '../constants';

import LoginForm from './LoginForm/LoginForm';

export default compose(
  stateSetup({
    inProgress: LoginForm.defaultProps.inProgress,
    rememberMe: LoginForm.defaultProps.rememberMe
  }),
  withHandlers({
    toggleRememberMe: ({ setRememberMe, rememberMe }) => () => setRememberMe(!rememberMe),
    handleSubmit: (
      {
        setInProgress,
        setReloadRequired,
        setResultMessage,
        productId,
        onSignInResult,
        onSignInSuccess
      }
    ) => (formData) => {
      const saveForLater = productId !== undefined;
      const bitmask = saveBitmasks.SIGN_IN;
      const path = saveForLater
        ? paths.JSON_API_QUICK_ACCOUNT_SIGN_IN_AND_SAVE_FOR_LATER
        : paths.JSON_API_QUICK_ACCOUNT_SIGN_IN_ONLY;

      setInProgress(true);
      setResultMessage('');

      postJSON(bitmask, formData, path)
        .then((response) => {
          setInProgress(false);

          const events = (response.statusDetails && response.statusDetails.events)
            ? response.statusDetails.events[bitmask] || []
            : [];

          switch (response.status) {
            case constants.SUCCESS_STATUS: {
              if (response.formSubmitFeedback[bitmask].formStatus === constants.SUCCESS_STATUS) {
                let result = {};

                if (saveForLater) {
                  result = getResultFromRespose(
                    events,
                    response.formSubmitFeedback[bitmask].wishlistProductUrl
                  );
                  const { savingResult } = result;

                  onSignInResult(
                    STATUS_SUCCESS,
                    savingResult,
                    stripTags(translations.saving_success),
                    formData.rememberMe
                  );
                  setReloadRequired(true);
                }

                onSignInSuccess(result, formData.rememberMe);

              }
              break;
            }

            case constants.ERROR_STATUS:
            default: {
              const errorMessage = extractMessages(
                response.formSubmitFeedback[bitmask].formMessages
              );
              setResultMessage(errorMessage);

              onSignInResult(
                events.indexOf(EVENT_INVALID_LOGIN) > -1 ? STATUS_FAILED : STATUS_SUCCESS,
                STATUS_FAILED,
                stripTags(errorMessage),
                formData.rememberMe
              );

              break;
            }
          }
        })
        .catch(() => {
          setInProgress(false);
          setResultMessage(translations.quick_account_response_error, 'negative');
        });
    }
  })
)(LoginForm);
