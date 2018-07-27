/* eslint-disable react/forbid-prop-types, jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../../atoms/icons';

class SearchList extends React.PureComponent {
  render() {
    const {
      activeItemIndex,
      displayHistory,
      displaySuggestions,
      error,
      onSelection,
      onMouseEnter,
      onMouseLeave,
      searchHistory,
      searchHistoryLabel,
      searchItems
    } = this.props;
    
    const listClasses = ['dc-search-list'];
    
    if (displayHistory) {
      listClasses.push('dc-search-list-history');
    }
    
    if (displaySuggestions) {
      listClasses.push('dc-search-list-suggestions');
    }
    
    let searchList = (<noscript />);
    const results = displayHistory ? searchHistory : searchItems;

    const items = results.map((searchItem, i) => {
      const text = typeof (searchItem) === 'object'
        ? (searchItem.text || searchItem.location)
        : searchItem;
      const active = activeItemIndex === i;
      const clickHandler = onSelection.bind(null, searchItem);

      const Icon = searchItem.icon ? icons[`${searchItem.icon}`] : false;

      const listItemClasses = ['dc-search-list-item'];

      if (active) {
        listItemClasses.push('dc-search-list-item-active');
      }

      if (!searchItem.restricted || !!searchItem.retailLocation) {
        listItemClasses.push('dc-search-list-item-visible');
      }

      return (
        <li
          className={listItemClasses.join(' ')}
          data-active={active}
          data-display={!searchItem.restricted || !!searchItem.retailLocation}
          data-element="Item"
          data-history={searchItem.source === 'HISTORY'}
          data-search-index={i}
          key={i}
          onClick={clickHandler} // eslint-disable-line react/jsx-no-bind
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          role="option"
          aria-selected={active}
          tabIndex={0}
        >
          <span
            className="heading-text"
            data-element="HeadingText"
          >
            {text}
          </span>
          
          {
            searchItem.description
              ? (
                <span
                  className="subheading-text"
                  data-element="SubHeadingText"
                >
                  {`  ${searchItem.description}`}
                </span>
              )
              : null
          }
          {
            Icon
              ? (
                <span
                  className="icon-container"
                  data-element="IconContainer"
                >
                  <Icon />
                </span>
              )
              : null
          }
        </li>
      );
    });

    if (results.length > 0 && results.length && error === null) {
      searchList = (
        <ul
          className={listClasses.join(' ')}
          data-component="SearchList"
          data-display-history={displayHistory}
          data-display-suggestions={displaySuggestions}
          data-history-label={searchHistoryLabel}
          role="listbox"
        >
          {items}
        </ul>
      );
    }

    return searchList;
  }
}

SearchList.displayName = 'SearchList';

SearchList.propTypes = {
  activeItemIndex: PropTypes.number,
  displayHistory: PropTypes.bool,
  displaySuggestions: PropTypes.bool,
  error: PropTypes.string,
  historyItems: PropTypes.array,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSelection: PropTypes.func,
  searchHistory: PropTypes.array,
  searchHistoryLabel: PropTypes.string,
  searchItems: PropTypes.array
};

SearchList.defaultProps = {
  activeItemIndex: -1,
  displayHistory: false,
  displaySuggestions: false,
  error: null,
  historyItems: [],
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onSelection: () => {},
  searchHistory: [],
  searchHistoryLabel: '',
  searchItems: []
};

export default SearchList;
