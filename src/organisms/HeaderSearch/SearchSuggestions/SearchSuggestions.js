/* eslint-disable react/jsx-no-bind */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './SearchSuggestions.styl';
import Rating from '../../../molecules/Rating/Rating';
import formatPrice from '../../../helpers/formatPrice';

const renderTerm = item => (
  <Fragment>
    {item.title}
  </Fragment>
);


const renderSayt = (item, currency) => (
  <Fragment>
    <img
      className="dc-search-suggestions__suggestion__product-image"
      alt=""
      src={item.image}
    />
    <div className="dc-search-suggestions__suggestion__content-container">
      <div className="dc-search-suggestions__suggestion__title-container">
        <div className="dc-search-suggestions__suggestion__product-title">
          {item.brand} {item.title}
        </div>
        <div
          className="dc-search-suggestions__suggestion__product-price"
        >
          {formatPrice(item.price, false, currency)}
        </div>
      </div>
      {item.reviewScore &&
      <Rating maxCount={5} ratingValue={parseInt(item.reviewScore, 10)} />
      }
    </div>
  </Fragment>
);


class SearchSuggestions extends Component {
  componentDidMount() {
    this.el = document.querySelector('[data-component="SearchSuggestions"]');
  }

  componentDidUpdate() {
    this.maxHeight = document.documentElement.clientHeight -
      (this.el ? this.el.getBoundingClientRect().top : 0);
  }

  render() {
    const {
      results, query, selectItem, cursor
    } = this.props;
    const display = (query && query.length > 0 && (results && results.length > 0)) || false;

    const classNames = ['dc-search-suggestions'];

    if (!display) {
      classNames.push('dc-search-suggestions--hidden');
    }

    return (
      <div
        data-component="SearchSuggestions"
        className={classNames.join(' ')}
        style={{ maxHeight: `${this.maxHeight}px` }}
      >
        {results.map((result, index) => {
          const renderItem = result.type === 'sayt' ? renderSayt : renderTerm;
          const suggestionClassNames = ['dc-search-suggestions__suggestion'];

          if (index === cursor) {
            suggestionClassNames.push('dc-search-suggestions__suggestion--active');
          }

          if (result.type === 'sayt') {
            suggestionClassNames.push('dc-search-suggestions__suggestion--sayt');
          } else {
            suggestionClassNames.push('dc-search-suggestions__suggestion--term');
          }

          return (
            <div
              className={suggestionClassNames.join(' ')}
              key={index}
              onClick={selectItem.bind(this, result)}
              role="menuitem"
              tabIndex={0}
            >
              {renderItem(result, this.props.currency)}
            </div>
          );
        })}
      </div>
    );
  }
}

const resultPropTypes = {
  brand: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  reviewScore: PropTypes.string,
  url: PropTypes.string
};


SearchSuggestions.propTypes = {
  cursor: PropTypes.number,
  query: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.shape(resultPropTypes)).isRequired,
  selectItem: PropTypes.func,
  currency: PropTypes.string
};

SearchSuggestions.defaultProps = {
  cursor: -1,
  query: '',
  currency: 'GBP',
  selectItem: () => {}
};

SearchSuggestions.displayName = 'SearchSuggestions';

export default SearchSuggestions;
