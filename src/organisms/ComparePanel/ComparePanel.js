import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import './ComparePanel.styl';
import ComparePanelProduct from '../ComparePanelProduct/ComparePanelProduct';
import Button from '../../molecules/Button/Button';
import ComparePanelProductTooltip
  from '../../organisms/ComparePanelProductTooltip/ComparePanelProductTooltip';

const MAX_NUMBER = 4;

/**
 * @deprecated this component will be removed in version 4.0.0
 */
class ComparePanel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isComparePanelProductTooltipVisible: false,
      productIdOfVisibleTooltip: null
    };

    this.productToRemove = this.productToRemove.bind(this);
    this.showComparePanelProductTooltip = this.showComparePanelProductTooltip.bind(this);
    this.hideComparePanelProductTooltip = this.hideComparePanelProductTooltip.bind(this);
  }

  productToRemove(index) {
    this.props.onRemoveProduct(index);
  }

  showComparePanelProductTooltip(productID) {
    if (!this.state.isComparePanelProductTooltipVisible ||
      this.state.productIdOfVisibleTooltip !== productID) {
      this.setState({
        isComparePanelProductTooltipVisible: true,
        productIdOfVisibleTooltip: productID
      });
      this.props.onPopupDisplay(productID);
    }
  }

  hideComparePanelProductTooltip() {
    if (this.state.isComparePanelProductTooltipVisible) {
      this.setState({
        isComparePanelProductTooltipVisible: false,
        productIdOfVisibleTooltip: null
      });
    }
  }

  render() {
    const compareItems = [];
    const { props } = this;

    for (let i = 0; i < MAX_NUMBER; i++) {
      compareItems.push(
        <div
          className={props.products[i]
            ? 'dc-compare-panel-item'
            : 'dc-compare-panel-item dc-compare-panel-item-empty'}
          key={i}
        >
          {props.products[i] && (
            <div>
              <ComparePanelProduct
                type="compare"
                imageUrl={props.products[i].imageUrl}
                productName={props.products[i].productName}
                productUrl={props.products[i].productUrl}
                onLinkClick={() => {
                  this.showComparePanelProductTooltip(props.products[i].productID);
                }}
              />
              <Button
                type="button"
                style="link"
                onClick={() => this.productToRemove(props.products[i])}
              >
                {props.removeLabel}
              </Button>
              {this.state.isComparePanelProductTooltipVisible &&
                this.state.productIdOfVisibleTooltip === props.products[i].productID &&
                  <div className="dc-compare-panel-product__tooltip">
                    <ComparePanelProductTooltip
                      onCloseButtonClick={this.hideComparePanelProductTooltip}
                      onClickOutsideOfTooltip={this.hideComparePanelProductTooltip}
                      onScroll={this.hideComparePanelProductTooltip}
                      onEmailMeButtonClickInTooltip={this.onEmailMeButtonClickInTooltip}
                      manufacturer={props.products[i].manufacturer}
                      imageAlt={props.products[i].productName}
                      imageUrl={props.products[i].imageUrl}
                      currentPrice={props.products[i].currentPrice}
                      productUrl={props.products[i].productUrl}
                      productName={props.products[i].productName}
                      onEmailMeBackLinkClicked={props.products[i].emailMeBack
                        ? (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          props.onEmailMeButtonClickInTooltip(props.products[i].productID);
                        }
                        : null
                      }
                      isBundle={props.products[i].isBundle}
                      outOfStock={!props.products[i].inStock}
                      mainProductCurrentPrice={props.products[i].mainProductCurrentPrice}
                      mainProductWasPrice={props.products[i].mainProductWasPrice}
                      mainProductWasPriceFrom={props.products[i].mainProductWasPriceFrom}
                      mainProductWasPriceTo={props.products[i].mainProductWasPriceTo}
                      savingsPrice={props.products[i].savingsPrice}
                      mainProductSaving={props.products[i].mainProductSaving}
                      separateSellingPrice={props.products[i].separateSellingPrice}
                      subItemNames={props.products[i].subItemNames}
                      wasPrice={props.products[i].wasPrice}
                    />
                  </div>
              }
            </div>

          )}
        </div>
      );
    }

    return (
      <div>
        {props.products.length > 0 &&
          <div className="dc-compare-panel">
            <div className="dc-compare-panel-heading">{props.title}</div>

            { compareItems }

            <div className="dc-site-currys dc-compare-panel-button">
              <Button style="full" onClick={props.buttonClick}>
                {props.compareLabel}
              </Button>
            </div>
          </div>
        }
      </div>
    );
  }
}

ComparePanel.displayName = 'ComparePanel';

ComparePanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.string,
  compareLabel: PropTypes.string,
  removeLabel: PropTypes.string,
  buttonClick: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.object),
  onRemoveProduct: PropTypes.func,
  onPopupDisplay: PropTypes.func,
  onEmailMeButtonClickInTooltip: PropTypes.func
};

ComparePanel.defaultProps = {
  children: '',
  title: 'Comparison list',
  compareLabel: 'Compare',
  removeLabel: 'Remove',
  buttonClick: () => {},
  products: [],
  onRemoveProduct: () => {},
  onPopupDisplay: () => {},
  onEmailMeButtonClickInTooltip: () => {}
};

export default ComparePanel;
