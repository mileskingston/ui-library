import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Loader from '../../organisms/Loader/Loader';

import './LazyLoadedImage.styl';

class LazyLoadedImage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    const newImage = document.createElement('img');

    newImage.src = this.props.src;

    newImage.onload = () => {
      this.setState({ loaded: true });
    };
  }

  render() {
    const { props, state } = this;
    const productImage = props.src
      ? <img className="dc-lazy-loaded-image__img" src={props.src} alt={props.alt} />
      : null;

    return (
      <div className="dc-lazy-loaded-image">
        {state.loaded ? (productImage) : (<Loader />)}
      </div>
    );
  }
}

LazyLoadedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default LazyLoadedImage;
