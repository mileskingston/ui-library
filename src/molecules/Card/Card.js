import PropTypes from 'prop-types';
import React from 'react';
import './Card.styl';

function Card(props) {
  let classes = [];

  if (props.classes) {
    classes = props.classes.split(' ');
  }

  classes.push('dc-card');

  return (
    <div data-component="Card" className={classes.join(' ')}>
      <div className="dc-card__title">
        {props.title}
      </div>
      <div className="dc-card__content">
        {props.children}
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.string])
    )
  ]).isRequired,
  classes: PropTypes.string
};

Card.defaultProps = {
  classes: ''
};

Card.displayName = 'Card';

export default Card;
