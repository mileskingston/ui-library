import React from 'react';
import PropTypes from 'prop-types';
import List from '../../molecules/List/List';
import Loader from '../../organisms/Loader/Loader';

import './ProductAvailability.styl';

function ProductAvailability(props) {
  const list = [];

  if (props.inProgress) {
    return (
      <div className="dc-product-availability" data-component="ProductAvailability">
        <Loader />
      </div>
    );
  }

  if (props.delivery.label) {
    list.push(
      {
        content: props.delivery.label,
        icon: props.delivery.available ? 'Tick' : 'Cross'
      }
    );
  }

  if (props.collection.label) {
    list.push(
      {
        content: props.collection.label,
        icon: props.collection.available ? 'Tick' : 'Cross'
      }
    );
  }

  if (!props.delivery.label && !props.collection.label) {
    return <noscript />;
  }

  return (
    <div className="dc-product-availability" data-component="ProductAvailability">
      <div className="dc-product-availability__title">
        {props.titleLabel}
        <span className="dc-product-availability__location"> {props.location}</span>
      </div>

      <List items={list} classes="dc-product-availability__list" />
    </div>
  );
}

ProductAvailability.propTypes = {
  location: PropTypes.string.isRequired,
  collection: PropTypes.shape({
    available: PropTypes.bool,
    label: PropTypes.string
  }),
  delivery: PropTypes.shape({
    available: PropTypes.bool,
    label: PropTypes.string
  }),
  titleLabel: PropTypes.string,
  inProgress: PropTypes.bool
};

ProductAvailability.defaultProps = {
  collection: {},
  delivery: {},
  titleLabel: 'For',
  inProgress: false
};

export default ProductAvailability;
