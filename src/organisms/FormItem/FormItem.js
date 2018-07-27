import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { regularExpressions } from '../../config';

import Icon from '../../molecules/Icon/Icon';
import Input from '../../molecules/Input/Input';
import Select from '../../molecules/Select/Select';
import PasswordStrengthIndicator from '../PasswordStrengthIndicator/PasswordStrengthIndicator';
import './FormItem.styl';

class FormItem extends Component {

  constructor(props) {
    super(props);

    this.typingTimeoutId = 0;

    this.state = {
      value: props.value || '',
      isValid: false,
      isFocused: props.autoFocus || false,
      canBeValid: true,
      isTyping: false
    };

    this.validate = this.validate.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
  }

  componentWillMount() {
    this.validate();

    if (!this.props.inactive && this.context.parentForm) {
      this.context.parentForm.registerItem(this);
    }
  }

  componentWillReceiveProps({ inactive: nextInactive }) {
    const { props, context } = this;

    if (!context.parentForm) {
      return;
    }

    if (
      nextInactive === false &&
      !context.parentForm.isItemRegistered(props.name)
    ) {
      context.parentForm.registerItem(this);
    }

    if (
      nextInactive === true &&
      context.parentForm.isItemRegistered(props.name)
    ) {
      context.parentForm.unregisterItem(props.name);
    }
  }

  componentWillUnmount() {
    if (this.context.parentForm) {
      this.context.parentForm.unregisterItem(this.props.name);
      this.setState({ registered: false });
    }
  }

  onValidityChange() {
    const { props: { mustMatch, mustBeMatchedBy }, context: { parentForm } } = this;

    if (mustMatch) {
      parentForm.getItem(mustMatch).validate();
    }

    if (mustBeMatchedBy) {
      parentForm.getItem(mustBeMatchedBy).forceUpdate();
    }

    if (parentForm) {
      parentForm.validate();
    }
  }

  getValue() {
    return this.state.value;
  }

  updateValue(value) {
    const { state, props, validate } = this;

    if (state.value !== value) {
      this.setState({ value }, () => {
        const isValid = validate();

        props.onValueUpdateImmediate(value, isValid);

        clearTimeout(this.typingTimeoutId);
        this.setState({ isTyping: true });

        this.typingTimeoutId = setTimeout(() => {
          this.setState({ isTyping: false });

          if (typeof props.onValueUpdate === 'function') {
            props.onValueUpdate(value, isValid);
          }
        }, props.typingDelay);
      });
    }
  }

  updateFocus(isFocused) {
    this.setState({ isFocused });
  }

  isValid() {
    return this.state.isValid;
  }

  validate() {
    const { props, state, context: { parentForm } } = this;
    const results = [];
    let isValid = true;
    let canBeValid = true;

    if (props.maxLength) {
      results.push(state.value.length <= props.maxLength);
    }

    if (props.minLength && state.value !== '') {
      results.push(state.value.length >= props.minLength);
    }

    if (props.isRequired) {
      // check if input has some nonwhite characters
      const whitespaces = regularExpressions.WHITE_SPACE;
      results.push(state.value !== '' && whitespaces.test(state.value));
    }

    if (props.mustMatch) {
      results.push(parentForm.getItemValue(props.mustMatch) === state.value);
    }

    if (props.mustBeMatchedBy) {
      const itemToMatch = parentForm.getItem(props.mustBeMatchedBy);
      const valueToMatch = itemToMatch ? itemToMatch.getValue() : '';

      if (valueToMatch !== '') {
        itemToMatch.validate();
      }
    }

    if (props.type === 'email') {
      const reEmail = regularExpressions.EMAIL;
      results.push(reEmail.test(state.value));
    }

    if (props.customFormat instanceof RegExp && state.value !== '') {
      results.push(props.customFormat.test(state.value));
    }

    if (props.progressiveValidation && state.value !== '') {
      const reProgressive = props.progressiveValidation;
      canBeValid = reProgressive.test(state.value);
    }

    if (props.blacklist) {
      results.push(props.blacklist.indexOf(state.value.toLowerCase()) === -1);
    }

    if (props.allowedChars) {
      let regex;
      switch (props.allowedChars) {
        case 'numeric':
          regex = regularExpressions.NUMERIC;
          break;
        case 'alphanumeric':
          regex = regularExpressions.ALPHANUMERIC;
          break;
        case 'specialalphanumeric':
          regex = regularExpressions.SPECIALALPHANUMERIC;
          break;
        case 'alpha':
        default:
          regex = regularExpressions.ALPHA;
          break;
      }
      results.push(regex.test(state.value));
    }

    isValid = results.indexOf(false) === -1;

    if (isValid !== this.state.isValid) {
      this.setState({ isValid }, this.onValidityChange);
    }

    if (canBeValid !== this.state.canBeValid) {
      this.setState({ canBeValid });
    }

    return isValid;
  }

  render() {
    const { props, state, context: { parentForm } } = this;
    let formItem = null;
    const gridClasses = ['dc-form-item'];
    const errorClasses = ['dc-form-item-message', 'dc-text-small'];
    const showErrorMessage = state.value !== '' && !state.isValid &&
      (!props.mustMatch || parentForm.getItem(props.mustMatch).state.isValid) &&
      (!state.isFocused || !state.canBeValid || (props.typingDelay > 0 && !state.isTyping)) &&
      props.errorMessage !== '';

    if (props.typingDelay === 0 || !state.isFocused) {
      errorClasses.push('dc-text-error');
    }

    switch (props.type) {
      case 'password':
      case 'text':
      case 'email':
      case 'hidden':
      default:
        formItem = (<Input
          type={props.type}
          name={props.name}
          value={state.value}
          label={props.label}
          placeholder={props.placeholder}
          passwordShowHide={props.passwordShowHide}
          isRequired={!props.inactive && props.isRequired}
          disabled={props.disabled}
          isValid={state.isValid}
          tabIndex={props.tabIndex}
          qa={props.qa}
          updateValue={this.updateValue}
          updateValueByUser={props.onValueUpdatedByUser}
          updateFocus={this.updateFocus}
          autoFocus={props.autoFocus}
          autoComplete={props.autoComplete}
        />);
        break;

      case 'select':
        formItem = (<Select
          options={props.options}
          selected={state.value}
          label={props.label}
          name={props.name}
          isRequired={!props.inactive && props.isRequired}
          disabled={props.disabled}
          isValid={state.isValid}
          qa={props.qa}
          onSelect={this.updateValue}
        />);
        break;
    }

    if (props.gridClasses) {
      gridClasses.push(props.gridClasses);
    }

    if (props.type === 'hidden') {
      gridClasses.push('dc-hidden');
    }

    return (
      <span className={gridClasses.join(' ')}>
        {formItem}
        {showErrorMessage &&
          <div
            className={errorClasses.join(' ')}
            dangerouslySetInnerHTML={{ __html: props.errorMessage }}
          />
        }
        {props.hint && (props.hint !== props.errorMessage || !showErrorMessage) &&
          <span className="dc-input-hint">{props.hint}</span>
        }
        {props.inProgress &&
          <span className="dc-form-item-in-progress">
            <Icon icon="Spinner" spin />
          </span>
        }
        {props.type === 'password' && props.showStrength &&
          <PasswordStrengthIndicator
            password={state.value}
            blacklist={props.blacklist}
            settings={props.psiSettings}
          />
        }
      </span>
    );
  }
}

// Access parent context by defining contextTypes
FormItem.contextTypes = {
  parentForm: PropTypes.object
};

FormItem.propTypes = {
  name: PropTypes.string.isRequired,

  allowedChars: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  blacklist: PropTypes.arrayOf(PropTypes.string),
  clearValue: PropTypes.bool,
  customFormat: PropTypes.instanceOf(RegExp),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  gridClasses: PropTypes.string,
  hint: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  inactive: PropTypes.bool,
  inProgress: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  mustBeMatchedBy: PropTypes.string,
  mustMatch: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
  passwordShowHide: PropTypes.bool,
  placeholder: PropTypes.string,
  progressiveValidation: PropTypes.instanceOf(RegExp),
  psiSettings: PropTypes.shape({}),
  qa: PropTypes.string,
  showStrength: PropTypes.bool,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(['text', 'password', 'email', 'hidden', 'select']),
  typingDelay: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * Is called after typingDelay
   */
  onValueUpdate: PropTypes.func,

  /**
   * Is called onKeyPress (browser autocomplete is excluded)
   */
  onValueUpdatedByUser: PropTypes.func,

  /**
   * Is called immediately when value is changed.
   */
  onValueUpdateImmediate: PropTypes.func
};

FormItem.defaultProps = {
  allowedChars: '',
  autoComplete: undefined,
  autoFocus: false,
  blacklist: undefined,
  clearValue: false,
  customFormat: undefined,
  disabled: false,
  errorMessage: '',
  gridClasses: '',
  hint: '',
  inactive: false,
  inProgress: false,
  isRequired: false,
  label: '',
  maxLength: undefined,
  minLength: undefined,
  mustBeMatchedBy: '',
  mustMatch: '',
  placeholder: '',
  options: [],
  passwordShowHide: false,
  progressiveValidation: undefined,
  psiSettings: {},
  qa: undefined,
  showStrength: false,
  tabIndex: undefined,
  type: 'text',
  typingDelay: 0,
  value: '',

  onValueUpdate: () => {},
  onValueUpdatedByUser: () => {},
  onValueUpdateImmediate: () => {}
};

export default FormItem;
