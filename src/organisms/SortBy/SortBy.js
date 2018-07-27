import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from '../../molecules/Select/Select';

import './SortBy.styl';

class SortBy extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };

    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    this.props.options.some((currentOption) => {
      if (currentOption.id === this.props.selected) {
        this.setState({
          selected: currentOption.id
        });
        return true;
      }
      return false;
    });
  }

  submitForm(id) {
    this.setState({
      selected: id
    }, () => {
      if (this.props.formId) {
        document.getElementById(this.props.formId).submit();
      }
    });
  }

  render() {
    const { props, state } = this;
    
    return (
      <div className="dc-sort-by">
        {props.title &&
          <span className="dc-sort-by-label">{props.title}</span>
        }
        <Select
          name="sSortBy"
          label={props.title}
          id="sSortBy"
          icon="ArrowDown"
          options={props.options}
          selected={state.selected}
          onSelect={(id) => { this.submitForm(id); }}
          isValid
        />
      </div>
    );
  }
}

SortBy.displayName = 'SortBy';

SortBy.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.required,
      label: PropTypes.string.required
    })
  ).isRequired,
  formId: PropTypes.string,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

SortBy.defaultProps = {
  title: '',
  formId: '',
  selected: undefined
};

export default SortBy;
