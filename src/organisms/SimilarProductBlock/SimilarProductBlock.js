import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Rating from '../../molecules/Rating/Rating';

import './SimilarProductBlock.styl';
import PriceBlock from '../../molecules/PriceBlock/PriceBlock';
import { translations } from '../../config';
import List from '../../molecules/List/List';

class SimilarProductBlock extends PureComponent {

  render() {
    const {
      props: {
        className,
        interaction,
        deviceType,
        minContainerHeight,
        onContainerRender,
        product
      }
    } = this;

    const finalClasses = className.split(' ');

    finalClasses.push('dc-similar-product-block');

    const reviewsCount = parseInt(product.reviews.replace(/\(|\)/g, '') || 0, 10);

    let ratingBlock = (
      <Rating
        maxCount={5}
        ratingCount={reviewsCount}
        ratingValue={parseInt(product.rating || 0, 10)}
      />
    );

    if (reviewsCount > 0) {
      ratingBlock = (
        <a
          data-interaction={interaction}
          className="dc-link"
          href={`${product.link_url}#tab3`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {ratingBlock}
        </a>
      );
    }

    return (
      <div
        data-component="SimilarProductBlock"
        className={finalClasses.join(' ')}
      >
        <div className="dc-similar-product-block__image-container">
          <a
            data-interaction={interaction}
            href={product.link_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={product.name}
              className="dc-similar-product-block__image-container__image"
              src={product.image_url}
            />
          </a>
        </div>
        <div
          ref={(container) => {
            if (container) {
              onContainerRender(container.offsetHeight);
            }
          }}
          style={{
            minHeight: minContainerHeight
          }}
        >
          <h2 className="dc-similar-product-block__title">
            <a
              data-interaction={interaction}
              className="dc-link"
              href={product.link_url}
              rel="noopener noreferrer"
              target="_blank"
              dangerouslySetInnerHTML={{
                __html: product.name
              }}
            />
          </h2>
          {['desktop', 'wide'].indexOf(deviceType) > -1 &&
            product.details.length &&
            <ul
              className="dc-similar-product-block__features"
            >
              {product.details.slice(0, 3).map((attribute, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: attribute
                  }}
                />
              ))}
            </ul>
          }
        </div>
        <PriceBlock
          price={product.price}
        />
        {ratingBlock}
        <List
          items={[
            product.home_delivery === 'true'
              ? {
                icon: 'Tick',
                content: translations.similar_product_delivery_available
              }
              : {
                icon: 'Cross',
                content: translations.similar_product_delivery_not_available
              },
            product.available_in_store === 'true'
              ? {
                icon: 'Tick',
                content: translations.similar_product_collect_available
              }
              : {
                icon: 'Cross',
                content: translations.similar_product_collect_not_available
              }
          ]}
        />
      </div>
    );
  }

}

SimilarProductBlock.displayName = 'SimilarProductBlock';

SimilarProductBlock.propTypes = {
  className: PropTypes.string,
  interaction: PropTypes.string,
  deviceType: PropTypes.oneOf([
    'mobile',
    'tablet',
    'desktop',
    'wide'
  ]).isRequired,
  onContainerRender: PropTypes.func,
  minContainerHeight: PropTypes.number.isRequired,
  product: PropTypes.shape({}).isRequired
};

SimilarProductBlock.defaultProps = {
  className: '',
  interaction: '',
  onContainerRender: () => {}
};

export default SimilarProductBlock;
