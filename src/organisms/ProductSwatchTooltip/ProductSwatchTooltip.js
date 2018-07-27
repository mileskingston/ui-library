import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../molecules/Tooltip/Tooltip';
import Icon from '../../molecules/Icon/Icon';
import LazyLoadedImage from '../../organisms/LazyLoadedImage/LazyLoadedImage';
import './ProductSwatchTooltip.styl';

class ProductSwatchTooltip extends PureComponent {
  renderProductFeature(productFeature) {
    return (
      <li
        className="dc-product-tooltip-feature"
        key={productFeature}
      >
        <Icon icon="Tick" size="large" />
        <span className="dc-product-tooltip-feature-desc">
          {productFeature}
        </span>
      </li>
    );
  }

  render() {
    const { product } = this.props;
    return (
      <Tooltip arrow="top" textAlign="center" radius floating style="compact">
        <article>
          <a href={product.product_url} className="dc-product-tooltip-link">
            <LazyLoadedImage alt="" src={product.img_url} />
          </a>

          {product.product_features &&
            <ul className="dc-product-tooltip-features">
              {product.product_features.map(this.renderProductFeature)}
            </ul>}

          <div
            className="dc-product-tooltip-price"
            dangerouslySetInnerHTML={{ __html: product.price }}
          />

          {(product.saving || product.was_price) &&
            <div className="dc-product-tooltip-discount">
              {product.was_price && <span
                className="dc-product-tooltip-was-price"
                dangerouslySetInnerHTML={{
                  __html: `Was ${product.was_price} `
                }}
              />}
              {product.saving && <span
                className="dc-product-tooltip-saving"
                dangerouslySetInnerHTML={{
                  __html: `${this.props.priceSaveTranslate} ${product.saving}`
                }}
              />}
            </div>}

          {product.out_of_stock &&
            <div className="dc-product-tooltip-stock-info">
              {this.props.outOfStockTranslate}
            </div>}

          {product.show_email_me_back_link &&
            <a
              className="dc-product-tooltip-email-back"
              href={`${product.product_url}#email-when-back-desktop`}
            >
              {this.props.emailMeWhenBackInStockTranslate}
            </a>}
        </article>
      </Tooltip>);
  }
}

ProductSwatchTooltip.propTypes = {
  product: PropTypes.shape({
    fupid: PropTypes.string,
    img_url: PropTypes.string,
    out_of_stock: PropTypes.bool,
    price: PropTypes.string,
    was_price: PropTypes.string,
    product_url: PropTypes.string,
    saving: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),
    swatch_img_url: PropTypes.string,
    variant: PropTypes.string
  }).isRequired,
  priceSaveTranslate: PropTypes.string.isRequired,
  outOfStockTranslate: PropTypes.string.isRequired,
  emailMeWhenBackInStockTranslate: PropTypes.string.isRequired
};

ProductSwatchTooltip.displayName = 'ProductSwatchTooltip';

export default ProductSwatchTooltip;
