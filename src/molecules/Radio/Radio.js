import React from 'react';
import PropTypes from 'prop-types';

import './Radio.styl';

function Radio(props) {
  const {
    id, name, checked, disabled, children, onChange, style, value
  } = props;
  const bulletClasses = ['dc-radio-bullet'];
  const containerClasses = ['dc-radio'];

  if (disabled) {
    bulletClasses.push('dc-radio-disabled');
  }

  if (checked) {
    bulletClasses.push('dc-radio-checked', 'dc-border-primary');
  }

  if (style === 'button') {
    containerClasses.push('dc-radio-button');
  }

  if (style === 'button' && checked) {
    containerClasses.push('dc-radio-button-checked');
  }

  return (
    <div data-component="Radio" className={containerClasses.join(' ')} onClick={onChange}>
      <label className="dc-radio-label" htmlFor={id}>
        <div className={bulletClasses.join(' ')}>
          <input
            id={id}
            name={name}
            type="radio"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            value={value}
          />
        </div>
        {children}
      </label>
    </div>
  );
}

Radio.displayName = 'Radio';

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node
};

Radio.defaultProps = {
  id: '',
  name: '',
  value: '',
  style: '',
  checked: false,
  disabled: false,
  onChange: () => {},
  children: undefined
};

export default Radio;
