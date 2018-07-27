import PropTypes from 'prop-types';
import React from 'react';
import './Label.styl';

function Label(props) {
  let classes = [];

  if (props.classes) {
    classes = props.classes.split(' ');
  }

  classes.push('dc-label');

  return (
    <div data-component="Label" className={classes.join(' ')}>
      <div className="dc-label__title">
        {props.title}
      </div>
      {props.subTitle &&
        <div className="dc-label__sub-title">
          {props.subTitle}
        </div>}
    </div>
  );
}

Label.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  classes: PropTypes.string
};

Label.defaultProps = {
  classes: '',
  subTitle: ''
};

Label.displayName = 'Label';

export default Label;
