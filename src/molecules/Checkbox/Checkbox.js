import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

import './Checkbox.styl';

function Checkbox(props) {
  const wrapperClasses = ['dc-checkbox-wrapper'];
  const checkboxClasses = ['dc-checkbox'];

  if (props.message) {
    wrapperClasses.push(
      'dc-checkbox-message',
      `dc-checkbox-message-${props.messageType}`
    );

    if (props.message !== '' && props.messageType === 'negative') {
      wrapperClasses.push('dc-checkbox-message-center');
    }
  }

  if (props.checked) {
    checkboxClasses.push('dc-checkbox-checked');
  }

  if (props.disabled) {
    wrapperClasses.push('dc-checkbox-disabled');
  }

  if (props.small) {
    checkboxClasses.push('dc-checkbox-small');
  }

  return (
    <div
      id={props.id}
      className={wrapperClasses.join(' ')}
      onClick={props.message ? null : props.onCheck}
      data-interaction={props.interaction}
    >
      <div className={checkboxClasses.join(' ')} data-qa={props.qa}>
        <Icon icon="Tick" visible={props.checked} />
        <input
          name={props.name}
          value={props.value}
          id={props.inputId}
          type="checkbox"
          className="dc-hidden"
          checked={props.checked}
          readOnly
        />
      </div>
      {props.message &&
        <div
          className="dc-checkbox-message"
          dangerouslySetInnerHTML={{ __html: props.message }}
        />
      }
      {!props.message && typeof props.label === 'string' &&
        <div
          className="dc-checkbox-label"
          dangerouslySetInnerHTML={{ __html: props.label }}
        />
      }
      {!props.message && typeof props.label === 'object' &&
        <div className="dc-checkbox-label">
          {props.label}
        </div>
      }
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  inputId: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  checked: PropTypes.bool,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  onCheck: PropTypes.func,
  message: PropTypes.string,
  messageType: PropTypes
    .oneOf([
      'positive',
      'negative'
    ]),
  interaction: PropTypes.string,
  qa: PropTypes.string
};

Checkbox.defaultProps = {
  id: undefined,
  inputId: undefined,
  name: '',
  value: '',
  checked: false,
  small: false,
  disabled: false,
  onCheck: () => {},
  message: '',
  messageType: undefined,
  interaction: undefined,
  qa: undefined
};

export default Checkbox;
