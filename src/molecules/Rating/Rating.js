import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

import './Rating.styl';

/**
 * SVG icon used in this component must include two
 * &lt;path&gt; elements to properly support halves.
 */
class Rating extends PureComponent {

  renderItems() {
    const { props: { icon, maxCount, ratingValue } } = this;

    const items = [];

    const hasHalfItem = ratingValue % 2 !== 0;
    const value = Math.round((hasHalfItem ? ratingValue - 1 : ratingValue) / 2);
    const defaultClasses = ['dc-rating-item'];

    for (let i = 1; i <= maxCount; i++) {
      const classes = defaultClasses.slice();

      if (i <= value) {
        classes.push('dc-rating-item--active');
      }

      if (hasHalfItem && (i - 1 === value)) {
        classes.push('dc-rating-item--half');
      }

      items.push(
        <span key={`item-${i}`} className={classes.join(' ')}>
          {icon}
        </span>
      );
    }

    return items;
  }

  render() {
    const { props: { ratingCount } } = this;


    return (
      <div data-component="Rating" className="dc-rating">
        {this.renderItems()}
        {ratingCount !== undefined &&
          <span className="dc-rating-count">({ratingCount})</span>
        }
      </div>
    );
  }

}

Rating.displayName = 'Rating';

Rating.propTypes = {
  icon: PropTypes.element,
  maxCount: PropTypes.number.isRequired,
  ratingCount: PropTypes.number,
  ratingValue: PropTypes.number.isRequired
};

Rating.defaultProps = {
  icon: <Icon icon="Star" />,
  ratingCount: undefined
};

export default Rating;
