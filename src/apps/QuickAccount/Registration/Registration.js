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
  EVENT_REGISTRATION_FAILED,
  STATUS_SUCCESS,
  STATUS_FAILED
} from '../constants';

import RegistrationForm from './RegistrationForm/RegistrationForm';

export default compose(
  stateSetup({
    inProgress: RegistrationForm.defaultProps.inProgress,
    notifyOnPriceDrop: RegistrationForm.defaultProps.notifyOnPriceDrop
  }),
  withHandlers({
    toggleNotifyOnPriceDrop: (
      { setNotifyOnPriceDrop, notifyOnPriceDrop }
    ) => () => setNotifyOnPriceDrop(!notifyOnPriceDrop),
    handleSubmit: (
      {
        setInProgress,
        setResult,
        setReloadRequired,
        setResultMessage,
        productId,
        notifyOnPriceDrop,
        onRegistrationResult,
        onRegistrationSuccess
      }
    ) => (formData) => {
      const saveForLater = productId !== undefined;
      const bitmask = saveBitmasks.REGISTRATION;
      const path = saveForLater
        ? paths.JSON_API_QUICK_ACCOUNT_CREATION_AND_SAVE_FOR_LATER
        : paths.JSON_API_QUICK_ACCOUNT_CREATION_ONLY;

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

                  onRegistrationResult(
                    STATUS_SUCCESS,
                    savingResult,
                    stripTags(translations.saving_success),
                    notifyOnPriceDrop
                  );
                  setReloadRequired(true);
                }

                onRegistrationSuccess(result);
              }
              break;
            }
            case constants.ERROR_STATUS:
            default: {
              const errorMessage = extractMessages(
                response.formSubmitFeedback[bitmask].formMessages
              );
              setResultMessage(errorMessage);

              onRegistrationResult(
                events.indexOf(EVENT_REGISTRATION_FAILED) > -1 ? STATUS_FAILED : STATUS_SUCCESS,
                STATUS_FAILED,
                stripTags(errorMessage),
                notifyOnPriceDrop
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
)(RegistrationForm);
