import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Flip.styl';

class Flip extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      viewBack: false
    };
  }

  render() {
    const { props, state } = this;
    const classes = ['dc-flip-container'];

    if (state.viewBack) {
      classes.push('dc-flip-rotate');
    }

    if (props.isVertical) {
      classes.push('dc-flip-vertical');
    }

    const { front, back } = props.children({
      flipToFront: () => this.setState({ viewBack: false }),
      flipToBack: () => this.setState({ viewBack: true })
    });

    return (
      <div className={classes.join(' ')}>
        <div className="dc-flip">
          <div className="dc-flip-front">
            {front}
          </div>
          <div className="dc-flip-back">
            {back}
          </div>
        </div>
      </div>
    );
  }

}

Flip.propTypes = {
  children: PropTypes.func.isRequired,
  isVertical: PropTypes.bool
};

Flip.defaultProps = {
  isVertical: false
};

export default Flip;
