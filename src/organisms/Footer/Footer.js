/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import StoreFinder from './StoreFinder/StoreFinder';
import FooterCompanyDetails from './FooterCompanyDetails/FooterCompanyDetails';

import './Footer.styl';

class Footer extends React.PureComponent {
  render() {
    const { links } = this.props;
    const lnks = links.map((lnk, index) => (
      <ul
        data-element="Column"
        key={index}
      >
        <li data-element="Item"><h5 data-element="Heading">{lnk.title}</h5></li>
        {
            lnk.links.map((link, idx) => (
              <li
                data-element="Item"
                key={idx}
              >
                <a
                  data-element="Link"
                  href={link.link}
                >{link.label}
                </a>
              </li>
              ))
          }
      </ul>
    ));
    return (
      <div>
        <div
          data-component="Footer"
        >
          <div data-element="Links">
            {lnks}
          </div>
          <div data-element="StoreFinderWrapper">
            <StoreFinder storeFinderURL={this.props.storeFinderURL} />
          </div>
        </div>
        <FooterCompanyDetails companyDetails={this.props.companyDetails} />
      </div>
    );
  }
}

Footer.displayName = 'Footer';

Footer.defaultProps = {
  storeFinderURL: 'http://www.currys.co.uk/gbuk/s/find-a-store.html'
};

Footer.propTypes = {
  storeFinderURL: PropTypes.string,
  companyDetails: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })).isRequired
  })).isRequired
};

export default Footer;
