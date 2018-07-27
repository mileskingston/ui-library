import { withHandlers, compose } from 'recompose';
import stateSetup from '../stateSetup';
import { extractMessages } from '../helpers';
import {
  constants,
  paths,
  postJSON,
  saveBitmasks,
  translations
} from '../../../';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';

export default compose(
  stateSetup({
    inProgress: ResetPasswordForm.defaultProps.inProgress
  }),
  withHandlers({
    handleSubmit: (
      {
        setInProgress,
        setResultMessage,
        onResetPasswordSuccess
      }
    ) => (formData) => {
      const bitmask = saveBitmasks.RESET_PASSWORD;
      const path = paths.JSON_API_QUICK_ACCOUNT_RESET_PASSWORD;

      setInProgress(true);
      setResultMessage('');

      postJSON(bitmask, formData, path)
        .then((response) => {
          setInProgress(false);

          switch (response.status) {
            case constants.SUCCESS_STATUS: {
              if (response.formSubmitFeedback[bitmask].formStatus === constants.SUCCESS_STATUS) {
                setResultMessage(
                  translations.quick_account_reset_password_request_message,
                  'positive'
                );
                onResetPasswordSuccess();
              }
              break;
            }

            case constants.ERROR_STATUS:
            default: {
              const errorMessage = extractMessages(
                response.formSubmitFeedback[bitmask].formMessages
              );

              setResultMessage(errorMessage);
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
)(ResetPasswordForm);
