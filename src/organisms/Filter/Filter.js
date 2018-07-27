import PropTypes from 'prop-types';
import React, { Component } from 'react';
import debounce from '../../helpers/debounce';
import Icon from '../../molecules/Icon/Icon';
import Input from '../../molecules/Input/Input';
import './Filter.styl';

class Filter extends Component {

  static validate(keyword) {
    return /^[0-9A-Z.&\-/"\s]*$/i.test(keyword);
  }

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      keyword: '',
      filtering: false,
      isValid: true
    };

    this.clearFilter = this.clearFilter.bind(this);
  }

  componentDidMount() {
    this.debouncedFilter = debounce(this.onFilter, 300);
    this.debouncedTracking = debounce(this.trackFiltering, 2000);
  }

  componentWillUnmount() {
    this.props.filterHandler('');
  }

  onFilter(keyword) {
    this.setState({ keyword, filtering: false });
    this.props.filterHandler(keyword);
  }

  trackFiltering(keyword) {
    if (keyword.trim() !== '') {
      this.props.trackingHandler(keyword);
    }
  }

  handleChange(keyword) {
    const isValid = Filter.validate(keyword);

    if (isValid) {
      this.setState({ value: keyword, filtering: true, isValid });
      this.debouncedFilter(keyword);
      this.debouncedTracking(keyword);
    } else {
      this.setState({ value: keyword, filtering: false, isValid });
      this.debouncedFilter(keyword);
      this.debouncedTracking(keyword);
    }
  }

  clearFilter() {
    this.handleChange('');
  }

  render() {
    const { props, state } = this;
    const filterClasses = ['dc-filter'];

    if (props.visibleItemsCount === 0) {
      filterClasses.push('dc-filter-empty-results');
    }

    return (
      <div data-component="Filter" className={filterClasses.join(' ')}>
        <Input
          qa={props.qa}
          updateValue={(keyword) => { this.handleChange(keyword); }}
          isValid={state.isValid}
          label={props.label}
          value={state.value}
          icon="Search"
        />

        {state.value &&
          <span className="dc-filter-clear" onClick={this.clearFilter}>
            <Icon icon="Cross" />
          </span>
        }

        {state.filtering &&
          <span className="dc-filter-spinner">
            <Icon icon="Spinner" spin />
          </span>
        }

        {state.keyword && props.resultsLabel &&
          <p className="dc-filter-info dc-text">
            {props.visibleItemsCount} {props.resultsLabel} {`"${this.state.keyword}"`}
          </p>
        }
      </div>
    );
  }
}

Filter.propTypes = {
  visibleItemsCount: PropTypes.number.isRequired,
  filterHandler: PropTypes.func.isRequired,
  trackingHandler: PropTypes.func,
  label: PropTypes.string,
  resultsLabel: PropTypes.string,
  qa: PropTypes.string
};

Filter.defaultProps = {
  label: '',
  resultsLabel: '',
  trackingHandler: () => {},
  qa: undefined
};

export default Filter;
