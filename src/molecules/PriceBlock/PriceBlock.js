import PropTypes from 'prop-types';
import React from 'react';
import './PriceBlock.styl';

import { formatPrice } from '../../helpers';

function PriceBlock(props) {
  let classes = [];

  if (props.classes) {
    classes = props.classes.split(' ');
  }

  classes.push('dc-price-block');

  const priceDisplay = typeof props.price === 'string'
    ? formatPrice(props.price, true, props.currency)
    : formatPrice(props.price, false, props.currency);

  return (
    <div data-component="PriceBlock" className={classes.join(' ')}>
      {props.title &&
        <span className="dc-price-block__title">
          {props.title}{' '}
        </span>
      }
      <span className="dc-price-block__price">
        {priceDisplay}
      </span>
      {props.info &&
        <span className="dc-price-block__info">
          {' '}{props.info}
        </span>
      }
    </div>
  );
}

PriceBlock.propTypes = {
  classes: PropTypes.string,
  currency: PropTypes.string,
  info: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string
};

PriceBlock.defaultProps = {
  classes: '',
  currency: 'GBP',
  info: '',
  title: ''
};

PriceBlock.displayName = 'PriceBlock';

export default PriceBlock;
