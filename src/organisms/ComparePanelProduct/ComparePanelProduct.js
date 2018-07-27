import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import LazyLoadedImage
  from '../../organisms/LazyLoadedImage/LazyLoadedImage';
  
import './ComparePanelProduct.styl';


/**
 * @deprecated this component will be removed in version 4.0.0
 */
// eslint-disable-next-line react/prefer-stateless-function
class ComparePanelProduct extends PureComponent {

  render() {
    const { props } = this;

    return (
      <div>
        <a
          className="dc-compare-panel-product"
          href={props.productUrl}
          onClick={(e) => {
            e.preventDefault();
            props.onLinkClick();
          }
          }
        >
          <LazyLoadedImage
            src={props.imageUrl}
            alt={props.productName}
          />
        </a>
      </div>
    );
  }
}

ComparePanelProduct.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productUrl: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func
};

ComparePanelProduct.defaultProps = {
  onLinkClick: () => {}
};

export default ComparePanelProduct;

