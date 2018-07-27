import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../molecules/Button/Button';
import Input from '../../../molecules/Input/Input';

import './SearchFieldset.styl';

const androidInputIntoView = (inputNode, timer = 0) => {
  if (/Android [4-6]/.test(navigator.appVersion)) {
    setTimeout(() => {
      inputNode.scrollIntoView();
    }, timer);
  }
};

class SearchFieldset extends Component {
  constructor(props) {
    super(props);
    this.onKeyPress = props.onKeyPress.bind(this);
  }

  // Shadow events would not preventDefault on input [Enter] key
  componentDidMount() {
    this.inputRef.addEventListener('keypress', this.onKeyPress, false);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.displaySearch &&
      this.props.displaySearch &&
      this.props.autoScrollSearchFieldset) {
      this.inputRef.focus();
      androidInputIntoView(this.inputRef, 200); // force input in view for Android
    }
  }

  componentWillUnmount() {
    this.inputRef.removeEventListener('keypress', this.onKeyPress, false);
  }

  render() {
    const {
      onBlur, onChange, onKeyUp, query
    } = this.props;
    return (
      <fieldset className="dc-search-fieldset nostyle">
        <div className="dc-search-fieldset__hidden">
          <input
            name="subaction"
            type="hidden"
            value="keyword_search"
          />
          <input
            name="submitted_by"
            type="hidden"
            value=""
          />
        </div>
        <div className="dc-search-fieldset__container">
          <Input
            aria-label="Search Field"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            clearIconEnabled
            id="search"
            name="search-field"
            updateFocus={focused => !focused && onBlur()}
            updateValue={onChange}
            onKeyUp={onKeyUp}
            placeholder={this.props.placeholder}
            inputRef={(input) => {
              this.inputRef = input;
            }}
            isRequired
            spellCheck="false"
            type="search"
            value={query}
            isValid
          />
          <Button
            classes="dc-search-fieldset__submit-button"
            dataInteraction="Main Header: Search Button"
            id="search_btn"
            type="submit"
            style="full"
          >
            {this.props.searchButtonLabel}
          </Button>
        </div>
      </fieldset>
    );
  }
}

SearchFieldset.displayName = 'SearchFieldset';

SearchFieldset.propTypes = {
  displaySearch: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  query: PropTypes.string,
  placeholder: PropTypes.string,
  searchButtonLabel: PropTypes.string,
  autoScrollSearchFieldset: PropTypes.bool
};

SearchFieldset.defaultProps = {
  displaySearch: false,
  placeholder: 'Product name or item no.',
  searchButtonLabel: 'Search',
  query: '',
  onBlur: () => {},
  onChange: () => {},
  onKeyPress: () => {},
  onKeyUp: () => {},
  autoScrollSearchFieldset: true
};

export default SearchFieldset;
