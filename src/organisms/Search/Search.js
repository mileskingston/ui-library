/* eslint-disable no-underscore-dangle, react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import SearchInput from '../SearchInput/SearchInput';
import SearchList from './SearchList/SearchList';
import './Search.styl';

/**
 * @deprecated this component will be removed in version 4.0.0
 */
class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.clearSearch = this.clearSearch.bind(this);
    this.getActiveItem = this.getActiveItem.bind(this);
    this.getNextActiveItem = this.getNextActiveItem.bind(this);
    this.handleMouseEnterOption = this.handleMouseEnterOption.bind(this);
    this.handleMouseLeaveOption = this.handleMouseLeaveOption.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.setNextActiveItem = this.setNextActiveItem.bind(this);
    this.onTextChange = this.onTextChange.bind(this);

    this.state = {
      displaySuggestions: false,
      focused: false,
      displayClearButton: false
    };
  }

  componentDidMount() {
    const { searchText, autosubmit } = this.props;

    this.mounted = true;

    if (autosubmit && searchText.length > 2) {
      this.onSearchClick();
    }
  }

  componentWillReceiveProps(newProps) {
    const { prefill } = newProps;
    if (prefill > 0) {
      const inputEl = this.searchRef;
      setTimeout(() => {
        inputEl.setSelectionRange(prefill, inputEl.value.length);
      }, 0);
    }
    if (newProps.searchText && !newProps.processing) {
      this.setState({ displayClearButton: true });
    } else {
      this.setState({ displayClearButton: false });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onSearchClick(e) {
    if (e) e.preventDefault();
    if (this.props.searchIcon) {
      this.props.onSelection(this.getActiveItem() || this.props.searchText);
    }
  }

  onKeyDown(e) {
    const currentKey = e.keyCode;

    if (currentKey === keycode.codes.up || currentKey === keycode.codes.down ||
      currentKey === keycode.codes.esc || currentKey === keycode.codes.enter) {
      e.preventDefault();
    }

    if (
      !this.props.searchText &&
      currentKey === keycode.codes.enter &&
      this.props.submitDisabled
    ) {
      return;
    }

    const nextActiveItem = this.getNextActiveItem(
      currentKey,
      this.props.activeItemIndex,
      this.props.searchItems.length - 1
    );

    this.setNextActiveItem(nextActiveItem);

    if (currentKey === keycode.codes.enter) {
      this.searchRef.blur();
      this.props.onSelection(this.getActiveItem() || this.props.searchText);
    }

    this.props.onKeyDown(e);
  }

  onTextChange(e) {
    this.props.onChange(e.target.value);
  }

  onFocus() {
    if (this.mounted) {
      this.setState({
        displaySuggestions: true,
        focused: true
      });

      this.props.onFocus();
    }
  }

  onBlur() {
    setTimeout(() => {
      if (this.mounted) {
        this.setState({
          displaySuggestions: false,
          focused: false
        });

        this.props.onBlur();
      }
    }, 200);
  }

  getNextActiveItem(currentKey, currentActiveItem, searchItemsLength) {
    let next = -1;
    if (searchItemsLength < 0) {
      return next;
    }
    switch (currentKey) {
      case keycode.codes.up:
        next = currentActiveItem < 1 ? searchItemsLength
          : currentActiveItem - 1;
        break;
      case keycode.codes.down:
        next = currentActiveItem === searchItemsLength ? 0
          : currentActiveItem + 1;
        break;
      case keycode.codes.esc:
        next = -1;
        break;
      default:
        next = currentActiveItem;
    }
    return next;
  }

  setNextActiveItem(next) {
    const nextActiveItem = typeof next === 'undefined' ? -1 : next;
    if (this.props.activeItemIndex !== nextActiveItem) {
      this.props.setActiveItem(nextActiveItem);
    }
  }

  getActiveItem() {
    const { searchItems, searchHistory, activeItemIndex } = this.props;
    const searchList = searchItems.length ? searchItems : searchHistory;
    return searchList[activeItemIndex];
  }

  handleMouseLeaveOption(e) {
    this.setNextActiveItem(-1);
    this.props.handleMouseLeaveOption(e);
  }

  handleMouseEnterOption(e) {
    this.setNextActiveItem(+e.currentTarget.getAttribute('data-search-index'));
    this.props.handleMouseLeaveOption(e);
  }

  clearSearch() {
    this.setState({
      displaySuggestions: true,
      focused: true
    });

    this.props.clearSearch();
  }

  /**
   * @public
   */
  displaySuggestions() {
    this.setState({ displaySuggestions: true });
  }

  render() {
    const { props, state } = this;
    const invalid = props.error !== null;
    const displayHistory = props.searchText === '' &&
      !!props.searchHistory.length &&
      state.displaySuggestions;
    return (
      <div
        className={`dc-search ${props.classes}`.trim()}
        data-component="Search"
        data-dirty={props.error !== null}
      >
        {typeof props.inputRenderer === 'function'
          ? props.inputRenderer(
            props,
            (el) => { this.searchRef = el; },
            {
              onClear: this.clearSearch,
              updateFocus: focused => (focused ? this.onFocus() : this.onBlur()),
              updateValue: (value, event) => this.onTextChange(event),
              onKeyDown: this.onKeyDown
            }
          )
          : (
            <SearchInput
              focusAfterClear
              icon="Search"
              isValid={!invalid}
              label={props.placeholder}
              onClear={this.clearSearch}
              onBlur={this.onBlur}
              onChange={this.onTextChange}
              onFocus={this.onFocus}
              onKeyDown={this.onKeyDown}
              onSearch={this.onSearchClick}
              processing={props.processing}
              inputRef={(el) => { this.searchRef = el; }}
              value={props.searchText}
            />
          )
        }

        <SearchList
          activeItemIndex={props.activeItemIndex}
          displayHistory={displayHistory}
          displaySuggestions={this.state.displaySuggestions}
          error={props.error}
          onMouseEnter={this.handleMouseEnterOption}
          onMouseLeave={this.handleMouseLeaveOption}
          onSelection={props.onSelection}
          searchHistory={props.searchHistory}
          searchHistoryLabel={props.searchHistoryLabel}
          searchItems={props.searchItems}
        />
      </div>
    );
  }
}
Search.displayName = 'Search';

Search.propTypes = {
  activeItemIndex: PropTypes.number.isRequired,
  autosubmit: PropTypes.bool,
  ariaLabel: PropTypes.string,
  classes: PropTypes.string,
  clearSearch: PropTypes.func,
  error: PropTypes.string,
  handleMouseLeaveOption: PropTypes.func,
  inputRenderer: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSelection: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  prefill: PropTypes.number,
  processing: PropTypes.bool,
  searchHistory: PropTypes.array,
  searchHistoryLabel: PropTypes.string,
  searchIcon: PropTypes.bool,
  searchItems: PropTypes.array,
  searchText: PropTypes.string,
  setActiveItem: PropTypes.func.isRequired,
  submitDisabled: PropTypes.bool
};

Search.defaultProps = {
  autosubmit: false,
  ariaLabel: 'Search',
  classes: '',
  clearSearch: () => {},
  error: null,
  handleMouseLeaveOption: () => {},
  inputRenderer: undefined,
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  prefill: 0,
  processing: false,
  searchHistory: [],
  searchIcon: true,
  searchItems: [],
  searchText: '',
  searchHistoryLabel: 'Previous searches',
  submitDisabled: false
};

export default Search;
