import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FormSimple.styl';

class FormSimple extends Component {

  constructor(props) {
    super(props);

    this.POST_CODE_ITEM_NAME = 'postCode';

    this.state = {
      isValid: false,
      items: {},
      submits: {},
      preSubmitHook: (callback) => { callback(); }
    };

    this.runPreSubmitHook = this.runPreSubmitHook.bind(this);
  }

  // Passes the information down to its children
  getChildContext() {
    return { parentForm: this };
  }

  getItem(itemName) {
    return this.state.items[itemName] || null;
  }

  getItemValue(itemName) {
    const item = this.getItem(itemName);
    return item ? item.getValue() : null;
  }

  setPreSubmitHook(preSubmitHook) {
    this.setState({ preSubmitHook });
  }

  runPreSubmitHook(event) {
    this.state.preSubmitHook(this.handleSubmit.bind(this, event));
  }

  validate() {
    const { state } = this;
    let isValid = true;

    Object.keys(state.items).forEach((itemName) => {
      const item = state.items[itemName];

      if (item && !item.isValid()) {
        isValid = false;
      }
    });

    if (isValid !== state.isValid) {
      this.setState({ isValid });
    }

    this.updateSubmitsDisabledState(!isValid);
  }

  updateSubmitsDisabledState(disabled) {
    Object.keys(this.state.submits).forEach((submit) => {
      this.state.submits[submit].setState({ disabled });
    });
  }

  isValid() {
    return this.state.isValid;
  }

  isItemRegistered(itemName) {
    return typeof this.state.items[itemName] !== 'undefined';
  }

  registerItem(item) {
    const { items } = this.state;

    if (!items[item.props.name]) {
      items[item.props.name] = item;
    }

    if (item.props.isRequired) {
      this.setState({ isAnyRequired: true });
    }

    this.setState({ items }, () => {
      this.validate();
    });
  }

  unregisterItem(itemName) {
    const { items } = this.state;

    if (items[itemName]) {
      delete items[itemName];

      this.setState({ items }, () => {
        this.validate();
      });
    }
  }

  registerSubmit(submit) {
    const { submits } = this.state;

    if (!submits[submit.props.name]) {
      submits[submit.props.name] = submit;
    }

    this.setState({ submits });
  }

  unregisterSubmit(submitName) {
    const { submits } = this.state;

    if (submits[submitName]) {
      delete submits[submitName];
    }
  }

  collectFormData() {
    const { items } = this.state;
    const formData = {};

    Object.keys(items).forEach((key) => {
      formData[key] = items[key].getValue();
    });

    return formData;
  }

  handleSubmit(event) {
    this.props.submitHandler(event, this.collectFormData());
  }

  render() {
    const { props } = this;

    return (
      <form
        method={props.method}
        action={props.action}
        className="dc-form"
        onSubmit={this.runPreSubmitHook}
      >
        {props.children}
      </form>
    );
  }
}

FormSimple.propTypes = {
  submitHandler: PropTypes.func,
  method: PropTypes.string,
  action: PropTypes.string
};

FormSimple.defaultProps = {
  submitHandler: () => {},
  method: 'GET',
  action: ''
};

// Make information available to its children
FormSimple.childContextTypes = {
  parentForm: PropTypes.object
};

export default FormSimple;
