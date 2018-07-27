import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProductSwatchTooltip from '../ProductSwatchTooltip/ProductSwatchTooltip';
import ClosableTooltip from '../ClosableTooltip/ClosableTooltip';
import { browser, debounce } from '../../helpers';
import './ProductSwatches.styl';

const whatInput = typeof window !== 'undefined'
  ? require('what-input')
  : {
    ask: () => undefined
  };

class ProductSwatches extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      swatchTooltipFupid: null, // tooltip specific for every swatch (eg. green, red, blue color)
      showSwatchHelpTooltip: false, // tooltip with general information about swatch.
      swatchHelpTooltipArrow: browser().isTouch ? 'top' : 'left'
    };

    this.renderSwatch = this.renderSwatch.bind(this);
    this.onSwatchClick = this.onSwatchClick.bind(this);
    this.onSwatchMouseOver = this.onSwatchMouseOver.bind(this);
    this.onSwatchMouseLeave = this.onSwatchMouseLeave.bind(this);
    this.onHelpIconClick = this.onHelpIconClick.bind(this);
    this.closeSwatchHelpTooltip = this.closeSwatchHelpTooltip.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', debounce(() => {
      this.setState({
        swatchHelpTooltipArrow: browser().isTouch ? 'top' : 'left'
      });
    }, 200));
  }

  onSwatchClick(swatchData) {
    if (this.props.onSwatchClick) {
      this.props.onSwatchClick(
        this.props.title.toLocaleLowerCase(),
        this.props.variants.length,
        swatchData
      );
    }
  }

  onSwatchMouseOver(variantFupid) {
    if (whatInput.ask() === 'touch') {
      return;
    }
    const browserType = browser();
    if (browserType.isWide || browserType.isDesktop) {
      this.setState({
        swatchTooltipFupid: variantFupid
      });
    }
  }

  onSwatchMouseLeave() {
    this.setState({
      swatchTooltipFupid: null
    });
  }

  onHelpIconClick() {
    this.setState({
      showSwatchHelpTooltip: true
    });
  }

  closeSwatchHelpTooltip() {
    this.setState({
      showSwatchHelpTooltip: false
    });
  }

  renderSwatch(swatchData) {
    const isActive = swatchData.fupid === this.props.current_product_fupid;

    const classes = ['dc-product-swatch'];
    if (isActive) {
      classes.push('dc-product-swatch-active');
    }

    return (
      <li
        onMouseOver={e => this.onSwatchMouseOver(swatchData.fupid)}
        onMouseLeave={this.onSwatchMouseLeave}
        onClick={e => this.onSwatchClick(swatchData)}
        className={classes.join(' ')}
        key={swatchData.fupid}
      >
        <a
          href={isActive ? null : swatchData.product_url}
          className="dc-product-swatch-link"
        >
          <img
            alt=""
            src={swatchData.swatch_img_url}
            className="dc-product-swatch-image"
          />
          <span
            className="dc-product-swatch-value"
            dangerouslySetInnerHTML={{ __html: swatchData.variant }}
          />
        </a>

        {this.state.swatchTooltipFupid === swatchData.fupid &&
          [
            <div
              className="dc-product-tooltip-hover-bridge"
              key={`bridge-${swatchData.fupid}`}
            />,
            <ProductSwatchTooltip
              product={swatchData}
              outOfStockTranslate={this.props.outOfStockTranslate}
              priceSaveTranslate={this.props.priceSaveTranslate}
              emailMeWhenBackInStockTranslate={this.props.emailMeWhenBackInStockTranslate}
              key={`tooltip-${swatchData.fupid}`}
            />
          ]
        }
      </li>
    );
  }

  render() {
    return (
      <div data-component="ProductSwatches" className="dc-product-swatches">
        <div className="dc-product-swatches-title">
          {this.props.swatch_title}
          {this.props.swatch_help_tooltip_translate &&
          !!this.props.swatch_help_tooltip_translate.length &&
            <span
              onClick={this.onHelpIconClick}
              onMouseOver={this.onHelpIconMouseHover}
              onMouseLeave={this.onHelpIconMouseLeave}
              className="dc-product-swatches-title-help"
            >i
            </span>
          }
          <div className="dc-product-swatches-tooltip-wrapper">
            <ClosableTooltip
              arrow={this.state.swatchHelpTooltipArrow}
              closeButtonClasses="dc-product-swatch-closable-tooltip"
              floating
              display={this.state.showSwatchHelpTooltip}
              type="info"
              style="compact"
              onCloseButtonClick={this.closeSwatchHelpTooltip}
              onClickOutsideOfTooltip={this.closeSwatchHelpTooltip}
            >
              <span
                dangerouslySetInnerHTML={{ __html: this.props.swatch_help_tooltip_translate }}
              />
            </ClosableTooltip>
          </div>
        </div>
        <ul className="dc-product-swatches-list">
          {this.props.variants.map(this.renderSwatch)}
        </ul>
      </div>
    );
  }
}

ProductSwatches.propTypes = {
  current_product_fupid: PropTypes.string.isRequired,
  current_product_variant: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  swatch_title: PropTypes.string.isRequired,
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
  ),
  swatch_help_tooltip_translate: PropTypes.string,
  onSwatchClick: PropTypes.func,
  priceSaveTranslate: PropTypes.string,
  outOfStockTranslate: PropTypes.string,
  emailMeWhenBackInStockTranslate: PropTypes.string
};

ProductSwatches.defaultProps = {
  variants: [],
  onSwatchClick: () => {},
  emailMeWhenBackInStockTranslate: 'Email me when back in stock',
  priceSaveTranslate: 'Save',
  outOfStockTranslate: 'Out of stock',
  swatch_help_tooltip_translate: ''
};

ProductSwatches.displayName = 'ProductSwatches';

export default ProductSwatches;
