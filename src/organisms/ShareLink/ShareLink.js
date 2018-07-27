import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../molecules/Icon/Icon';

import './ShareLink.styl';

const serviceToIconName = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  googlePlus: 'GooglePlus',
  pinterest: 'Pinterest',
  hotDealsUK: 'HotDealsUK',
  mail: 'Mail'
};

const serviceToLabel = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  googlePlus: 'Google+',
  pinterest: 'Pinterest',
  hotDealsUK: 'HotUKDeals',
  mail: 'Email'
};

const ShareLink = ({ enableAnalytics, service, shareUrl }) => {
  let iframe;
  if (service === 'hotDealsUK') {
    iframe = (
      <iframe
        className="dc-share-iframe"
        frameBorder="0"
        scrolling="no"
        src={shareUrl}
        title={`share-${service}`}
      />
    );
  }

  return (
    <a
      data-component="ShareLink"
      data-interaction={enableAnalytics ? `social-${service}` : undefined}
      className="dc-link dc-share-link"
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => iframe && e.preventDefault()}
    >
      {iframe}
      <Icon icon={serviceToIconName[service]} />
      <span className="dc-link-label">{serviceToLabel[service]}</span>
    </a>
  );
};

ShareLink.displayName = 'ShareLink';

ShareLink.propTypes = {

  /**
   * If true, link will get data-interaction property with value of `social-$service`.
   */
  enableAnalytics: PropTypes.bool,

  /**
   * Service name for share link. Affects icon and label
   */
  service: PropTypes.oneOf([
    'facebook',
    'twitter',
    'googlePlus',
    'pinterest',
    'hotDealsUK',
    'mail'
  ]).isRequired,

  /**
   * Url to share. Must contain service-specific url.
   */
  shareUrl: PropTypes.string.isRequired
};

ShareLink.defaultProps = {
  enableAnalytics: false
};

export default ShareLink;
