import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { staticTimeoutResolver } from '../../helpers';
import Button from '../../molecules/Button/Button';

class FormSubmit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      formProcessing: props.workInProgress || false,
      tooltip: props.tooltip || '',
      tooltipType: props.tooltipType || 'positive'
    };
  }

  componentDidMount() {
    this.context.parentForm.registerSubmit(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.workInProgress !== nextProps.workInProgress) {
      this.setState({ formProcessing: nextProps.workInProgress });
    }

    if (this.props.tooltip !== nextProps.tooltip) {
      this.setState({
        tooltip: nextProps.tooltip
      });
    }

    if (this.props.tooltipType !== nextProps.tooltipType) {
      this.setState({
        tooltipType: nextProps.tooltipType
      });
    }
  }

  componentDidUpdate() {
    if (this.state.tooltip !== '') {
      setTimeout(() => {
        this.setState({ tooltip: '' });
      }, staticTimeoutResolver(this.state.tooltip));
    }
  }

  componentWillUnmount() {
    if (this.context.parentForm) {
      this.context.parentForm.unregisterSubmit(this.props.name);
    }
  }

  /**
   * @public
   */
  focus() {
    this.button.focus();
  }

  render() {
    const { props, state } = this;
    const gridClasses = ['dc-form-item'];

    if (props.gridClasses) {
      gridClasses.push(props.gridClasses);
    }

    return (
      <span className={gridClasses.join(' ')}>
        <Button
          ref={(button) => { this.button = button; }}
          style={props.style}
          disabled={state.disabled || props.disabled || state.formProcessing}
          tooltip={state.tooltip}
          tooltipType={state.tooltipType}
          workInProgress={state.formProcessing}
          qa={props.qa}
          fadeInOut
        >
          {state.formProcessing ? props.labelInProgress : props.label}
        </Button>
      </span>
    );
  }
}

// Access parent context by defining contextTypes
FormSubmit.contextTypes = {
  parentForm: PropTypes.object
};

FormSubmit.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelInProgress: PropTypes.string,
  workInProgress: PropTypes.bool,
  gridClasses: PropTypes.string,
  qa: PropTypes.string,
  style: PropTypes
    .oneOf([
      'outline',
      'full',
      'small-outline',
      'small-full'
    ]),
  tooltip: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  tooltipType: PropTypes
    .oneOf([
      'positive',
      'negative',
      'info',
      'warning'
    ])
};

FormSubmit.defaultProps = {
  disabled: false,
  label: 'Submit',
  labelInProgress: '',
  workInProgress: false,
  gridClasses: '',
  qa: undefined,
  style: 'outline',
  tooltip: undefined,
  tooltipType: undefined
};

export default FormSubmit;
