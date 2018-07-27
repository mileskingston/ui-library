import PropTypes from 'prop-types';
import React from 'react';

import { translations } from '../../config';
import Button from '../../molecules/Button/Button';

import './AddToBasketButton.styl';


function AddToBasketButton(props) {

  const {
    children, classes, productId, postUrl, savedOn, placement, isDownload
  } = props;

  return (
    <form action={postUrl} data-component="AddToBasketButton" method="POST">
      <div className="dc-hidden">
        <input type="hidden" name="subaction" value="cart" />
        <input type="hidden" name="sFUPID" value={productId} />
        <input type="hidden" name="iQuantity" value="1" />
        <input type="hidden" name="action" value="addProduct" />
        {placement === AddToBasketButton.placements.WISHLIST &&
          <input type="hidden" name="wasAddedFromWishlist" value />
        }
      </div>

      <div
        className={`dc-add-to-basket-button dc-add-to-basket-button--${
          isDownload ? 'download' : 'buy'
        }`}
      >
        <Button
          dataInteraction="add-to-basket"
          type="submit"
          style={isDownload ? 'checkout-download' : 'checkout'}
          classes={classes}
        >
          {children}
        </Button>

        {placement === AddToBasketButton.placements.WISHLIST &&
          <p className="dc-add-to-basket-button__save-date">{translations.saved_on} {savedOn}</p>
        }
      </div>
    </form>
  );
}

AddToBasketButton.displayName = 'AddToBasketButton';

AddToBasketButton.placements = {
  WISHLIST: 'WISHLIST',
  SIMILAR_PRODUCT: 'SIMILAR_PRODUCT'
};

AddToBasketButton.defaultProps = {
  classes: '',
  savedOn: '',
  placement: AddToBasketButton.placements.WISHLIST,
  isDownload: false
};

AddToBasketButton.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  productId: PropTypes.string.isRequired,
  postUrl: PropTypes.string.isRequired,
  savedOn: PropTypes.string,
  placement: PropTypes.oneOf(
    Object.keys(AddToBasketButton.placements)
  ),
  isDownload: PropTypes.bool
};

export default AddToBasketButton;
