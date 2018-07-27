/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../molecules/Icon/Icon';
import UkMap from './Maps/UkMap';
import EirMap from './Maps/EirMap';
import { resolveByCountry } from '../../../helpers/environment';

class StoreFinder extends React.PureComponent {
  renderMap() {
    return resolveByCountry(UkMap, EirMap);
  }

  render() {
    const {
      buttonText,
      description,
      heading,
      storeFinderURL: findStoreUrl
    } = this.props;
    return (
      <div
        data-component="StoreFinder"
      >
        <h4 data-element="Heading">{heading}</h4>
        <p data-element="Description">{description}</p>
        <div
          data-element="Button"
        >
          <a
            data-element="Link"
            href={findStoreUrl}
          >
            <Icon icon="LocationPin" />
            <span>{buttonText}</span>
          </a>
        </div>

        {this.renderMap()}
      </div>
    );
  }
}

StoreFinder.displayName = 'StoreFinder';

StoreFinder.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  storeFinderURL: PropTypes.string
};

StoreFinder.defaultProps = {
  heading: 'Store finder',
  description: 'Enter your postcode to find your nearest Currys store:',
  buttonText: 'Find stores',
  storeFinderURL: 'http://www.currys.co.uk/gbuk/s/find-a-store.html'
};

export default StoreFinder;
