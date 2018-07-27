import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon/Icon';
import Close from '../../organisms/Close/Close';
import translations from '../../config/translations';
import './Input.styl';

class Input extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isFocused: props.autoFocus || false,
      showPassword: false
    };

    this.toggleFocusOn = this.toggleFocusOn.bind(this);
    this.toggleFocusOff = this.toggleFocusOff.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  clearValue() {
    this.props.updateValue('');
    this.toggleFocusOn();
    this.inputEl.focus();
  }

  handleUserInput(event) {
    const isProbablyAutocomplete = event.currentTarget.value.length - 1 > this.props.value.length;
    if (!isProbablyAutocomplete && typeof this.props.updateValueByUser === 'function') {
      this.props.updateValueByUser(event.currentTarget.value, event);
    }
  }

  handleChange(event) {
    if (typeof this.props.updateValue === 'function') {
      this.props.updateValue(event.currentTarget.value, event);
    }
  }

  toggleFocusOn() {
    this.setState({ isFocused: true });

    if (typeof this.props.updateFocus === 'function') {
      this.props.updateFocus(true);
    }
  }

  toggleFocusOff() {
    this.setState({ isFocused: false });

    if (typeof this.props.updateFocus === 'function') {
      this.props.updateFocus(false);
    }
  }

  passwordToggle() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  render() {
    const { props, state } = this;

    const inputClasses = ['dc-input', 'nostyle'];
    const labelClasses = ['dc-form-item-label'];

    if (props.isValid && props.value !== '') {
      inputClasses.push('dc-input-valid');
    }
    if (!props.isValid && props.value !== '') {
      inputClasses.push('dc-input-invalid');
    }
    if (props.disabled) {
      inputClasses.push('dc-input-disabled');
    }
    if (state.isFocused) {
      inputClasses.push('dc-input-focused');
    }
    if (props.type === 'password') {
      inputClasses.push('dc-input-password');
    }
    if (props.icon) {
      inputClasses.push('dc-input-icon-left');
    }
    if (props.clearIconEnabled) {
      inputClasses.push('dc-input-clear-icon');
    }
    if (state.isFocused || props.value !== '') {
      labelClasses.push('dc-form-item-label-top');
    }

    let inputId = `input-${props.name}`;
    if (props.id) {
      // If inputId was passed, use that instead of name.
      inputId = props.id;
    }

    return (
      <span data-component="Input" className="dc-input-wrapper">
        <input
          className={inputClasses.join(' ')}
          type={this.state.showPassword ? 'text' : props.type}
          id={inputId}
          name={props.name}
          onKeyUp={props.onKeyUp}
          onKeyDown={props.onKeyDown}
          onInput={this.handleUserInput}
          onChange={this.handleChange}
          onFocus={this.toggleFocusOn}
          onBlur={this.toggleFocusOff}
          value={props.value}
          placeholder={props.placeholder}
          required={props.isRequired}
          disabled={props.disabled}
          tabIndex={props.tabIndex}
          autoFocus={props.autoFocus}
          autoComplete={props.autoComplete}
          ref={(ref) => {
            this.inputEl = ref;
            props.inputRef(ref);
          }}
          data-qa={props.qa}
        />
        {props.icon &&
          <span className="dc-input-icon"><Icon icon={props.icon} /></span>
        }
        {props.clearIconEnabled && props.value &&
          <span className="dc-input__clear-icon">
            <Close onClose={this.clearValue} />
          </span>
        }
        {props.label &&
          <label htmlFor={`input-${props.name}`} className={labelClasses.join(' ')}>
            {props.label}{props.isRequired && '*'}
          </label>
        }
        {props.type === 'password' && props.passwordShowHide && props.value !== '' &&
          <span className="dc-link dc-input-toggle" onClick={this.passwordToggle}>
            {state.showPassword
              ? translations.psi_hide_password
              : translations.psi_show_password}
          </span>
        }
      </span>
    );
  }
}

Input.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  clearIconEnabled: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'password', 'email', 'hidden', 'search']),
  inputRef: PropTypes.func,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  passwordShowHide: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  updateFocus: PropTypes.func,
  updateValue: PropTypes.func,
  updateValueByUser: PropTypes.func,
  icon: PropTypes.string,
  tabIndex: PropTypes.number,
  id: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  qa: PropTypes.string
};

Input.defaultProps = {
  autoComplete: undefined,
  autoFocus: false,
  clearIconEnabled: false,
  type: 'text',
  value: '',
  isRequired: false,
  disabled: false,
  name: '',
  inputRef: () => {},
  isValid: false,
  label: '',
  placeholder: '',
  passwordShowHide: false,
  updateFocus: undefined,
  updateValue: undefined,
  updateValueByUser: undefined,
  icon: '',
  tabIndex: undefined,
  id: '',
  onKeyDown: () => {},
  onKeyUp: () => {},
  qa: undefined
};

export default Input;
