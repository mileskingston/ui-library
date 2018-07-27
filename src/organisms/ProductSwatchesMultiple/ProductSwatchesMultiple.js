import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProductSwatches from '../ProductSwatches/ProductSwatches';
import './ProductSwatchesMultiple.styl';

class ProductSwatchesMultiple extends PureComponent {
  renderProductSwatches() {
    return this.props.productSwatches.map(productSwatch =>
      (
        <ProductSwatches
          {...productSwatch}
          onSwatchClick={this.props.onSwatchClick}
          emailMeWhenBackInStockTranslate={this.props.emailMeWhenBackInStockTranslate}
          priceSaveTranslate={this.props.priceSaveTranslate}
          outOfStockTranslate={this.props.outOfStockTranslate}
          key={productSwatch.title}
        />
      ));
  }

  render() {
    return (
      <div data-component="ProductSwatchesMultiple">
        <h2 className="dc-product-swatches-multiple-header">
          {this.props.availableOptionsTranslate}
        </h2>
        {this.renderProductSwatches()}
      </div>
    );
  }
}

ProductSwatchesMultiple.propTypes = {
  productSwatches: PropTypes.arrayOf(
    PropTypes.shape({
      current_product_fupid: PropTypes.string,
      current_product_variant: PropTypes.string,
      title: PropTypes.string,
      swatch_help_tooltip_translate: PropTypes.string,
      variants: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
      )
    })
  ),
  onSwatchClick: PropTypes.func,
  availableOptionsTranslate: PropTypes.string,
  emailMeWhenBackInStockTranslate: PropTypes.string,
  priceSaveTranslate: PropTypes.string,
  outOfStockTranslate: PropTypes.string
};

ProductSwatchesMultiple.defaultProps = {
  productSwatches: [],
  onSwatchClick: () => {},
  availableOptionsTranslate: 'Available options',
  emailMeWhenBackInStockTranslate: 'Email me when back in stock',
  priceSaveTranslate: 'Save',
  outOfStockTranslate: 'Out of stock'
};

ProductSwatchesMultiple.displayName = 'ProductSwatchesMultiple';

export default ProductSwatchesMultiple;
