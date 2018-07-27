import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { translations } from '../../config';
import Rating from '../../molecules/Rating/Rating';
import Icon from '../../molecules/Icon/Icon';

import './ProductBlock.styl';

class ProductBlock extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isCompareProductBlockTooltipVisible: false
    };
  }

  detectPriceDrop() {
    const {
      props: {
        viewPriceDrop,
        product: {
          rawPriceWhenSaved,
          rawPrice
        }
      }
    } = this;

    return viewPriceDrop && !!rawPrice && !!rawPriceWhenSaved &&
      parseFloat(rawPriceWhenSaved) > parseFloat(rawPrice);
  }

  renderProductRating(product) {
    const { props } = this;
    const rating = (
      <Rating
        maxCount={5}
        ratingCount={product.ratingCount}
        ratingValue={product.rating}
      />
    );

    let content;

    if (product.ratingCount > 0) {
      if (props.viewProductLinks && product.productUrl) {
        content = (
          <a
            data-interaction="product-review"
            onClick={props.onLinkClick}
            className="dc-link"
            href={`${product.productUrl}#tab3`}
          >
            {rating}
          </a>
        );
      } else {
        content = rating;
      }
    } else {
      content = (
        <span className="dc-product-block-no-reviews-message">
          {translations.no_reviews_label} (0)
        </span>
      );
    }

    return (
      <div className="dc-product-block-rating">
        {content}
      </div>
    );
  }

  render() {
    const { props } = this;
    const classes = ['dc-product-block'];
    const priceClasses = ['dc-product-block-price'];
    const priceBlockClasses = ['dc-text-center', 'dc-product-block-price-info'];
    const titleClasses = ['dc-product-block-title'];
    const displayPriceDrop = this.detectPriceDrop();

    const productImage = props.product.imageUrl
      ? <img alt={props.product.productName} src={props.product.imageUrl} />
      : null;

    if (props.product.isOutOfStock) {
      priceBlockClasses.push('dc-product-block-price-disabled');
    }

    if (props.truncateTitle) {
      titleClasses.push('dc-text-nowrap', 'dc-ellipsis');
    }

    if (displayPriceDrop) {
      priceBlockClasses.push('dc-product-block-price-drop-active');
    }

    if (props.type) {
      classes.push(`dc-product-block-${props.type}`);
    }

    return (
      <div>
        {(!props.type || props.type === 'price') && (
          <div className={classes.join(' ')}>
            <h2 className={titleClasses.join(' ')}>
              {props.viewProductLinks && props.product.productUrl
                ? (
                  <a
                    data-interaction="view-product"
                    onClick={props.onLinkClick}
                    href={props.product.productUrl}
                    className="dc-link"
                  >
                    {props.product.productName}
                  </a>
                )
                : props.product.productName
              }
            </h2>

            <div className="dc-product-block-content">
              <div className="dc-product-block-image">
                {props.viewProductLinks && props.product.productUrl
                  ? (
                    <a
                      data-interaction="view-product"
                      onClick={props.onLinkClick}
                      href={props.product.productUrl}
                    >
                      {productImage}
                    </a>
                  )
                  : productImage
                }
              </div>

              <div className={priceBlockClasses.join(' ')}>
                {displayPriceDrop &&
                  <div className="dc-product-block-price-drop-label">
                    <Icon icon="PriceTag" />&nbsp;{translations.price_drop_label}
                  </div>
                }
                <hr className="dc-spacing-bottom" />
                <p
                  className={priceClasses.join(' ')}
                  dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
                    __html: props.product.price
                  }}
                />
                {props.product.savePrice && <p
                  className="dc-product-block-save-price"
                  dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
                    __html: props.product.savePrice
                  }}
                />}
                <hr className="dc-spacing-top" />
                {props.product.wasPrice && <p
                  className="dc-product-block-was-price"
                  dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
                    __html: props.product.wasPrice
                  }}
                />}
                {this.renderProductRating(props.product)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ProductBlock.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string,
    isDownload: PropTypes.bool,
    productName: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    rawPrice: PropTypes.number,
    productId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    productUrl: PropTypes.string,
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    savePrice: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    wasPrice: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    priceWhenSaved: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    rawPriceWhenSaved: PropTypes.number
  }),
  truncateTitle: PropTypes.bool,
  type: PropTypes.string,
  viewProductLinks: PropTypes.bool,
  viewPriceDrop: PropTypes.bool,
  onLinkClick: PropTypes.func
};

ProductBlock.defaultProps = {
  type: null,
  truncateTitle: false,
  viewProductLinks: false,
  viewPriceDrop: false,
  onLinkClick: () => {},
  product: {}
};

export default ProductBlock;
