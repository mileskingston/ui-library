/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import './FooterCompanyDetails.styl';

class FooterCompanyDetails extends React.PureComponent {
  render() {
    const { companyDetails } = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: companyDetails
        }}
        data-component="FooterCompanyDetails"
      />
    );
  }
}

FooterCompanyDetails.displayName = 'FooterCompanyDetails';

FooterCompanyDetails.propTypes = {
  companyDetails: PropTypes.string.isRequired
};

export default FooterCompanyDetails;
