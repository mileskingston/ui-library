import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ProductBlock, translations } from '../../../';
import './SaveForLaterConfirmation.styl';

function SaveForLaterConfirmation(props) {
  return (
    <div className="dc-confirmation">

      {props.product &&
        <ProductBlock
          product={{
            ...props.product,
            productName: props.product.name,
            imageUrl: props.product.image
          }}
        />
      }

      {props.viewDetails &&
        <div className="dc-confirmation-details">
          <Icon icon="MyDetails" />
          <span dangerouslySetInnerHTML={{ __html: translations.supply_extra_details }} />
        </div>
      }

      <div className="dc-confirmation-continue-link dc-text-center">
        <a href="#close" className="dc-link" onClick={props.onPopupClose}>
          {translations.continue_shopping}
        </a>
      </div>
    </div>
  );
}

SaveForLaterConfirmation.propTypes = {
  viewDetails: PropTypes.bool,
  message: PropTypes.string,
  product: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }),
  onPopupClose: PropTypes.func
};

SaveForLaterConfirmation.defaultProps = {
  viewDetails: false,
  message: undefined,
  product: undefined,
  onPopupClose: () => {}
};

export default SaveForLaterConfirmation;
