/* global R3_COMMON, RR, r3, rr_flush_onload */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './SimilarProducts.styl';

class SimilarProducts extends PureComponent {

  static processData(jsonData) {
    if (!jsonData.placements || !jsonData.placements[0]) {
      return [];
    }

    let productsData = jsonData.placements[0].items;

    productsData = productsData.map(product => ({
      ...product,
      details: product.product_details.split('§')
    }));

    return productsData;
  }

  constructor(...params) {
    super(...params);

    this.state = {
      minContainerHeight: [],
      similarProducts: []
    };

    this.detectMinContainerHeight = this.detectMinContainerHeight.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.currentProductIds.length) {
      this.fetchSimilarProducts(
        this.props.currentProductIds
      );
    }
  }

  componentWillReceiveProps({ currentProductIds: nextProductIds }) {
    const {
      props: {
        currentProductIds
      }
    } = this;
    if (
      nextProductIds.length &&
      (currentProductIds || []).sort().join('-') !== (nextProductIds || []).sort().join('-')
    ) {
      this.fetchSimilarProducts(nextProductIds);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  detectMinContainerHeight(containerHeight) {
    const { deviceType } = this.props;
    this.setState(({ minContainerHeight }) => ({
      minContainerHeight: {
        ...minContainerHeight,
        [deviceType]: minContainerHeight[deviceType] > containerHeight
          ? minContainerHeight[deviceType]
          : containerHeight
      }
    }));
  }

  fetchSimilarProducts(currentProductIds) {
    if (
      typeof R3_COMMON === 'undefined' ||
      typeof RR === 'undefined'
    ) {
      // eslint-disable-next-line no-console
      console.warn('RichRelevance not available.');
      return;
    }

    R3_COMMON.itemIds = undefined;
    currentProductIds
      .filter((v, i, a) => a.indexOf(v) === i)
      .forEach(R3_COMMON.addItemId);

    RR.jsonCallback = () => {
      if (this.mounted) {
        this.setState({
          similarProducts: SimilarProducts.processData(RR.data.JSON)
        });
      }
    };

    rr_flush_onload();
    r3();
  }

  render() {
    const {
      props: {
        children,
        deviceType,
        numberOfItems
      },
      state: {
        minContainerHeight,
        similarProducts
      }
    } = this;

    return children({
      deviceType: deviceType,
      similarProducts: similarProducts.slice(0, numberOfItems),
      detectMinContainerHeight: this.detectMinContainerHeight,
      minContainerHeight: minContainerHeight[deviceType] || 0
    });
  }

}

SimilarProducts.displayName = 'SimilarProducts';

SimilarProducts.propTypes = {
  /**
   * Function which receives loaded products and other arguments needed
   * for rendering product blocks.
   *
   * It receives object with following properties:
   *
   * - **deviceType**: device type sent to SimilarProducts component
   * - **similarProducts**: array of loaded items
   * - **detectMinContainerHeight**: Function is used to resolve `minTitleHeight`.
   * Should be called from inner components.
   * - **minContainerHeight**: minimum features list height based on result
   * of `detectMinContainerHeight` function.
   * Should be used in children components.
   * - **minTitleHeight**: minimum title height based on result of `detectMinTitleHeight` function.
   * Should be used in children components.
   */
  children: PropTypes.func.isRequired,

  /**
   * List of product ids which similar products should be loaded for.
   */
  currentProductIds: PropTypes.arrayOf(PropTypes.string).isRequired,

  /**
   * Number of items to display.
   * If loading from server returns more items it will limit resulting list to this number.
   */
  numberOfItems: PropTypes.number.isRequired,

  /**
   * Device type
   */
  deviceType: PropTypes.oneOf([
    'mobile',
    'tablet',
    'desktop',
    'wide'
  ]).isRequired
};

SimilarProducts.defaultProps = {};

export default SimilarProducts;
