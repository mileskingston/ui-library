/* eslint-disable react/no-set-state, react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash.debounce';
import SearchSuggestions from './SearchSuggestions/SearchSuggestions';
import SearchFieldset from './SearchFieldset/SearchFieldset';

import './HeaderSearch.styl';

class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.loadResults = _debounce(this.loadResults.bind(this), 300);
    this.setSuggestionFocus = this.setSuggestionFocus.bind(this);
    this.resetSuggestionFocus = this.resetSuggestionFocus.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._updateQuery = this._updateQuery.bind(this); // eslint-disable-line no-underscore-dangle
    // Using state as this is purely for UI behavior:
    // (mousehover of suggestions, keyboard highlight)
    this.state = {
      cursor: -1,
      query: props.query,
      suggestionFocus: false
    };
  }

  handleSubmit(event) {
    this.props.searchAction(this.state.query, event);
    event.preventDefault();
  }

  changeValue(query) {
    this.setState({
      cursor: -1,
      query
    });
    if (!query.length) return;
    this.loadResults(query);
  }

  loadResults(query) {
    this.props.clearResults();
    if (query.length > 2) this.props.loadAutocomplete(query);
  }

  onBlur() {
    this.setState({ cursor: -1 });
    if (!this.state.suggestionFocus) {
      this.props.clearResults();
    }
    return null;
  }

  keyPress(e) {
    const { results } = this.props;
    const { cursor } = this.state;
    if (e.key === 'Enter' && cursor > -1) {
      e.preventDefault();
      e.stopPropagation();
      this.selectItem(results[cursor]);
    }
  }

  keyUp(e) {
    const { cursor } = this.state;
    const max = this.props.results.length;
    if (e.key === 'ArrowUp' && cursor > 0) {
      this.setState({ cursor: cursor - 1 });
    } else if (e.key === 'ArrowDown' && cursor < (max - 1)) {
      this.setState({ cursor: cursor + 1 });
    }
  }

  selectItem(item) {
    const { clearResults } = this.props;
    const defaultHandleSuggestionSelect = () => {
      if (item.type === 'sayt') {
        this._updateQuery(`${item.brand} ${item.title}`); // eslint-disable-line no-underscore-dangle
        if (window) window.location.href = item.url;
      } else {
        this._updateQuery(item.title); // eslint-disable-line no-underscore-dangle
        setTimeout(() => {
          this.formEl.submit();
        }, 0);
      }
    };
    if (typeof this.props.onSuggestionSelect === 'function') {
      this.props.onSuggestionSelect(item, defaultHandleSuggestionSelect);
    } else {
      defaultHandleSuggestionSelect();
    }
    setTimeout(() => {
      clearResults();
      this.setState({ cursor: -1 });
    }, 300);
  }

  setSuggestionFocus() {
    this.setState({ suggestionFocus: true });
  }

  resetSuggestionFocus() {
    this.setState({ suggestionFocus: false });
  }

  _updateQuery(query) {
    this.setState({ query });
  }

  render() {
    const { results, displaySearch, searchAction } = this.props;

    const classes = ['dc-header-search', 'nostyle'];

    if (displaySearch) {
      classes.push('dc-header-search--visible');
    }

    const formProps = {
      id: 'searchForm',
      className: classes.join(' '),
      ref: (el) => { this.formEl = el; this.props.formRef(el); }
    };

    if (typeof (searchAction) === 'function') {
      formProps.onSubmit = this.handleSubmit;
    } else if (typeof searchAction === 'string') {
      formProps.action = searchAction;
      formProps.method = 'POST';
    }

    return (
      <form {...formProps}>
        <SearchFieldset
          displaySearch={displaySearch}
          onBlur={this.onBlur}
          onChange={this.changeValue}
          onKeyPress={this.keyPress}
          onKeyUp={this.keyUp}
          query={this.state.query}
          searchButtonLabel={this.props.searchButtonLabel}
          autoScrollSearchFieldset={this.props.autoScrollSearchFieldset}
        />
        <div
          className="dc-header-search__suggestions"
          onMouseEnter={this.setSuggestionFocus}
          onMouseLeave={this.resetSuggestionFocus}
        >
          <SearchSuggestions
            currency={this.props.currency}
            cursor={this.state.cursor}
            query={this.state.query}
            results={results}
            selectItem={this.selectItem}
          />
        </div>
      </form>
    );
  }
}

HeaderSearch.propTypes = {
  clearResults: PropTypes.func.isRequired,
  displaySearch: PropTypes.bool,
  isFetching: PropTypes.bool,
  loadAutocomplete: PropTypes.func,
  onSuggestionSelect: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.shape({
    brand: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    reviewScore: PropTypes.string,
    url: PropTypes.string
  })),
  currency: PropTypes.string,
  searchAction: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  searchButtonLabel: PropTypes.string,
  formRef: PropTypes.func,
  autoScrollSearchFieldset: PropTypes.bool
};

HeaderSearch.defaultProps = {
  query: '',
  results: [],
  currency: 'GBP',
  displaySearch: false,
  isFetching: false,
  loadAutocomplete: () => {},
  onSuggestionSelect: null,
  searchButtonLabel: 'Search',
  formRef: () => {},
  autoScrollSearchFieldset: true
};


HeaderSearch.displayName = 'HeaderSearch';

export default HeaderSearch;
