import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Icon from '../Icon/Icon';
import './ProductPriceBlock.styl';

import { formatPrice } from '../../helpers';

function ProductPriceBlock(props) {
  const classes = ['dc-product-price-block', `dc-product-price-block--${props.style}`];

  if (props.outOfStock) {
    classes.push('dc-product-price-block__out-of-stock');
  }

  function getPricesOutputForNonBundleProduct() {
    return (
      <Fragment>
        {props.wasPrice && props.savingsPrice &&
        <div className="dc-product-price-block__was-and-save-prices">
          <span className="dc-product-price-block__was-and-save-prices__was-price">
           Was {`${formatPrice(props.wasPrice, false)} `}
          </span>
          <span className="dc-product-price-block__was-and-save-prices__save-price">
            save {formatPrice(props.savingsPrice, false)}
          </span>
        </div>
        }
        {!props.wasPrice && props.savingsPrice &&
        <div className="dc-product-price-block__save-price">
          Save {formatPrice(props.savingsPrice, false)}
        </div>
        }
      </Fragment>
    );
  }

  function getPricesOutputForBundleProduct() {
    return (
      <div className="dc-product-price-block-bundle">
        {props.mainProductWasPrice &&
        <div className="dc-product-price-block-bundle__main-product-price">
          Main product was {formatPrice(props.mainProductWasPrice, false)}
        </div>
        }
        {props.mainProductWasPriceFrom && props.mainProductWasPriceTo &&
        <div className="dc-product-price-block-bundle__from-to-dates">
          (from {props.mainProductWasPriceFrom} to {props.mainProductWasPriceTo}),
        </div>
        }
        {(props.mainProductCurrentPrice || props.mainProductSaving) &&
        <div className="dc-product-price-block-bundle__now-and-save-prices">
          {props.mainProductCurrentPrice &&
          <span className="dc-product-price-block-bundle__now-and-save-prices__now-price">
            {`now ${formatPrice(props.mainProductCurrentPrice, false)}. `}
          </span>
          }
          {props.mainProductSaving &&
          <span className="dc-product-price-block-bundle__now-and-save-prices__save-price">
            Save {formatPrice(props.mainProductSaving, false)}
          </span>
          }
        </div>
        }
      </div>
    );
  }

  return (
    <div className="dc-product-price-block__wrapper">
      {props.isPriceDropped &&
        <div className="dc-product-price-block__drop-label">
          <Icon icon="PriceTag" />&nbsp;{props.priceDropLabel}
        </div>
      }
      <div data-component="ProductPriceBlock" className={classes.join(' ')}>
        <div className="dc-product-price-block__current-price">
          {formatPrice(props.currentPrice, false)}
        </div>

        {!props.isBundle
          ? getPricesOutputForNonBundleProduct()
          : getPricesOutputForBundleProduct()}
      </div>
    </div>
  );
}

ProductPriceBlock.propTypes = {
  isBundle: PropTypes.bool,
  isPriceDropped: PropTypes.bool,
  outOfStock: PropTypes.bool,
  currentPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  savingsPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mainProductSaving: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  wasPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mainProductCurrentPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mainProductWasPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mainProductWasPriceFrom: PropTypes.string,
  mainProductWasPriceTo: PropTypes.string,
  priceDropLabel: PropTypes.string,
  style: PropTypes.oneOf(['default', 'compact'])
};

ProductPriceBlock.defaultProps = {
  isBundle: false,
  isPriceDropped: false,
  outOfStock: false,
  currentPrice: undefined,
  savingsPrice: undefined,
  mainProductSaving: undefined,
  wasPrice: undefined,
  mainProductCurrentPrice: undefined,
  mainProductWasPrice: undefined,
  mainProductWasPriceFrom: undefined,
  mainProductWasPriceTo: undefined,
  priceDropLabel: 'Price drop',
  style: 'default'
};

export default ProductPriceBlock;
