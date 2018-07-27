import React from 'react';
import PropTypes from 'prop-types';

import ClosableTooltip from '../../organisms/ClosableTooltip/ClosableTooltip';
import ProductPriceBlock from '../../molecules/ProductPriceBlock/ProductPriceBlock';
import List from '../../molecules/List/List';
import formatPrice from '../../helpers/formatPrice';

import './ComparePanelProductTooltip.styl';

/**
 * @deprecated this component will be removed in version 4.0.0
 */
function ComparePanelProductTooltip(props) {

  const {
    display, productUrl, productName, imageUrl, imageAlt, currentPrice, manufacturer,
    onCloseButtonClick, onClickOutsideOfTooltip, onScroll, isBundle, outOfStock,
    savingsPrice, wasPrice, mainProductCurrentPrice, mainProductSaving, mainProductWasPrice,
    mainProductWasPriceFrom, mainProductWasPriceTo, subItemNames, onEmailMeBackLinkClicked,
    separateSellingPrice
  } = props;

  const mainComponentClass = display ? 'dc-compare-panel-product-tooltip'
    : 'dc-compare-panel-product-tooltip--hidden';

  return (
    <div className={mainComponentClass}>
      <ClosableTooltip
        arrow="top"
        onCloseButtonClick={onCloseButtonClick}
        onClickOutsideOfTooltip={onClickOutsideOfTooltip}
        onScroll={onScroll}
        display={display}
        type="neutral"
      >
        <a href={productUrl} className="dc-compare-panel-product-tooltip__product-link">
          <div className="dc-compare-panel-product-tooltip__product-link-wrapper">
            <span href={productUrl} className="dc-compare-panel-product-tooltip__name">
              {manufacturer ? `${manufacturer} ` : ''}{productName}
            </span>
            {isBundle &&
            <div className="dc-compare-panel-product-tooltip__bundle-list">
              <List
                items={subItemNames.slice(1)}
                icon="PlusCircle"
              />
            </div>
            }
            <div className="dc-compare-panel-product-tooltip__bottom-part-flexbox-wrapper">
              <div className="dc-compare-panel-product-tooltip__image">
                <img src={imageUrl} alt={imageAlt} />
              </div>
              <div className="dc-compare-panel-product-tooltip__right-panel">
                <ProductPriceBlock
                  currentPrice={currentPrice}
                  isBundle={isBundle}
                  outOfStock={outOfStock}
                  savingsPrice={savingsPrice}
                  wasPrice={wasPrice}
                  mainProductCurrentPrice={mainProductCurrentPrice}
                  mainProductSaving={mainProductSaving}
                  mainProductWasPrice={mainProductWasPrice}
                  mainProductWasPriceFrom={mainProductWasPriceFrom}
                  mainProductWasPriceTo={mainProductWasPriceTo}
                />
                {outOfStock &&
                <div className="dc-compare-panel-product-tooltip__right-panel__out-of-stock">
                  <List
                    items={['Sorry this item is out of stock']}
                    icon="Cross"
                  />
                </div>
                }
                {onEmailMeBackLinkClicked &&
                <div
                  className="dc-compare-panel-product-tooltip__right-panel__email-me-back"
                  onClick={onEmailMeBackLinkClicked}
                >
                  <List
                    items={['Email me when back in stock']}
                    icon="Mail"
                  />
                </div>
                }
                {separateSellingPrice &&
                <div
                  className="dc-compare-panel-product-tooltip__right-panel__separate-sell-price"
                >
                  Separate selling price {formatPrice(separateSellingPrice, false)}
                </div>
                }
              </div>
            </div>
          </div>
        </a>
      </ClosableTooltip>
    </div>
  );
}

ComparePanelProductTooltip.propTypes = {
  display: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
  onClickOutsideOfTooltip: PropTypes.func,
  onScroll: PropTypes.func,
  imageAlt: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  manufacturer: PropTypes.string,
  currentPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  productUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  isBundle: PropTypes.bool,
  outOfStock: PropTypes.bool,
  onEmailMeBackLinkClicked: PropTypes.func,
  savingsPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  wasPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  separateSellingPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mainProductCurrentPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mainProductSaving: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mainProductWasPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mainProductWasPriceFrom: PropTypes.string,
  mainProductWasPriceTo: PropTypes.string,
  subItemNames: PropTypes.arrayOf(PropTypes.string)

};

ComparePanelProductTooltip.defaultProps = {
  display: true,
  onCloseButtonClick: undefined,
  onClickOutsideOfTooltip: undefined,
  onScroll: undefined,
  imageAlt: '',
  manufacturer: '',
  isBundle: false,
  outOfStock: false,
  onEmailMeBackLinkClicked: undefined,
  savingsPrice: undefined,
  wasPrice: undefined,
  separateSellingPrice: undefined,
  mainProductCurrentPrice: undefined,
  mainProductSaving: undefined,
  mainProductWasPrice: undefined,
  mainProductWasPriceFrom: undefined,
  mainProductWasPriceTo: undefined,
  subItemNames: []
};

export default ComparePanelProductTooltip;

