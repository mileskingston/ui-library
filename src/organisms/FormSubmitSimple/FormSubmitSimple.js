import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from '../../molecules/Button/Button';

class FormSubmitSimple extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: true
    };
  }

  componentDidMount() {
    this.context.parentForm.registerSubmit(this);
  }

  render() {
    const { props, state } = this;

    return (
      <Button
        style="full"
        name={props.name}
        value={props.value}
        disabled={state.disabled}
      >{props.label}
      </Button>
    );
  }
}

FormSubmitSimple.contextTypes = {
  parentForm: PropTypes.object
};

FormSubmitSimple.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string
};

FormSubmitSimple.defaultProps = {
  label: 'Submit',
  value: ''
};

export default FormSubmitSimple;
