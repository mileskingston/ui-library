import React from 'react';
import PropTypes from 'prop-types';

import { EMAIL_RECOGNITION_TIMEOUT } from '../constants';
import { translations } from '../../../config';
import { FormItem } from '../../../';

import './EnterEmail.styl';

function EnterEmail(props) {
  return (
    <div className="dc-enter-email">
      <FormItem
        autoFocus={props.autoFocus}
        name="email"
        type="email"
        value={props.email}
        label={translations.email}
        errorMessage={translations.email_validation_error}
        typingDelay={EMAIL_RECOGNITION_TIMEOUT}
        inProgress={props.recognitionInProgress}
        onValueUpdate={props.handleEmailUpdate}
        onValueUpdatedByUser={props.handleEmailUpdateByUser}
        onValueUpdateImmediate={props.handleEmailUpdateImmediate}
        isRequired
      />

      <FormItem
        name="password"
        type="password"
        gridClasses="dc-hidden"
        autoComplete="password"
      />

      {props.children}
    </div>
  );
}

EnterEmail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  autoFocus: PropTypes.bool,
  email: PropTypes.string,
  recognitionInProgress: PropTypes.bool,
  handleEmailUpdate: PropTypes.func,
  handleEmailUpdateByUser: PropTypes.func,
  handleEmailUpdateImmediate: PropTypes.func
};

EnterEmail.defaultProps = {
  children: undefined,
  autoFocus: false,
  email: '',
  recognitionInProgress: false,
  handleEmailUpdate: () => {},
  handleEmailUpdateByUser: () => {},
  handleEmailUpdateImmediate: () => {}
};

export default EnterEmail;
