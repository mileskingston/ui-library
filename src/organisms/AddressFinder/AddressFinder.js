/* global BUILD_ENV */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { constants, paths, maxInputLengths } from '../../config';
import regularExpressions from '../../config/regularExpressions/gb'; // TODO: revert when PCC is prepared for Ireland
import normalizePostCode from '../../helpers/normalizePostCode/gb'; // TODO: revert when PCC is prepared for Ireland
import {
  browser,
  get,
  capitalize,
  getPostalSector,
  scrollToElement,
  staticTimeoutResolver,
  truncateText
} from '../../helpers';
import Button from '../../molecules/Button/Button';
import FormItem from '../../organisms/FormItem/FormItem';
import './AddressFinder.styl';

class AddressFinder extends Component {

  constructor(props) {
    super(props);

    this.REQUEST_TIMEOUT = 10000; // Request longer then 10 seconds will be ignored and submit will be allowed
    this.VALID_HTTP_STATUSES = [
      200, // Postcode exists, valid data returned
      204, // Postcode exists, but too many data so nothing returned
      504 // Third party service unavailable, skip validation and allow form submit
    ];
    this.SUBMIT_TURN_ON = 'on';
    this.SUBMIT_TURN_OFF = 'off';
    this.SCROLL_OFFSET = 60;

    this.postCodesCache = {};
    this.requestTimoutId = 0;
    this.errorMessageTimeoutId = 0;

    this.state = {
      receiving: false,
      addresses: [],
      isSubmitAllowed: true,
      showErrorMessage: false
    };

    this.clearAddresses = this.clearAddresses.bind(this);
    this.findAddresses = this.findAddresses.bind(this);
    this.findPostalSector = this.findPostalSector.bind(this);
    this.handlePostCodeUpdate = this.handlePostCodeUpdate.bind(this);
    this.fillForm = this.fillForm.bind(this);
    this.updateFields = this.updateFields.bind(this);
  }

  componentDidMount() {
    this.setPostalSectorHook(true);
  }

  componentWillUpdate(nextProps, nextState) {
    this.submitOnOff.updateValue(
      nextState.isSubmitAllowed ? this.SUBMIT_TURN_ON : this.SUBMIT_TURN_OFF
    );

    if (nextState.showErrorMessage) {
      this.errorMessageTimeoutId = setTimeout(() => {
        this.setState({ showErrorMessage: false });
      }, staticTimeoutResolver(nextProps.unknownPostcodeMessage));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.requestTimoutId);
    clearTimeout(this.errorMessageTimeoutId);
  }

  setPostalSectorHook(set) {
    this.context.parentForm.setPreSubmitHook(
      set ? this.findPostalSector : (callback) => { callback(); }
    );
  }

  findAddresses() {
    const postCode = this.postCodeField.getValue().toLowerCase();

    if (this.postCodesCache[postCode]) {
      this.setPostalSectorHook(false);

      this.setState({
        addresses: this.postCodesCache[postCode],
        isSubmitAllowed: true,
        showErrorMessage: false
      });

    } else {
      this.setState({
        receiving: true,
        isSubmitAllowed: false
      });

      get(`${paths.ADDRESS_SUGGESTIONS_URL}${postCode}`, this.VALID_HTTP_STATUSES)
        .then((results) => {
          this.setState({ receiving: false });
          this.setPostalSectorHook(false);

          if (results !== undefined && results.length > 0) {
            const addresses = results.map(
              address => ({ ...address.addressInfo, postcode: address.postcode })
            );

            for (let i = 0; i < addresses.length; i++) {
              addresses[i].city = capitalize(addresses[i].city);
            }

            this.postCodesCache[postCode] = addresses;

            return addresses;
          }

          return [];
        })
        .then((results) => {
          this.setState({
            addresses: results,
            isSubmitAllowed: true,
            showErrorMessage: results.length === 0
          });
        })
        .catch(() => {
          this.setState({
            receiving: false,
            isSubmitAllowed: true,
            showErrorMessage: true
          });

          this.clearAddresses();
          this.setPostalSectorHook(true);
        });
    }
  }

  findPostalSector(callback) {
    const postalSector = this.props.postCodeRequired &&
      getPostalSector(this.postCodeField.getValue()).toLowerCase();
    let isRequestTooLong = false;

    if (!postalSector) {
      this.setState({
        receiving: false,
        isSubmitAllowed: true
      });
      if (typeof callback === 'function') {
        callback();
      }
      return;
    }

    this.requestTimoutId = setTimeout(() => {
      isRequestTooLong = true;

      this.setState({
        receiving: false,
        showErrorMessage: false
      });

      if (typeof callback === 'function') {
        callback();
      }
    }, this.REQUEST_TIMEOUT);

    this.setPostalSectorHook(false);
    this.setState({
      receiving: true,
      isSubmitAllowed: false
    });

    get(`${paths.ADDRESS_SUGGESTIONS_URL}${postalSector}`, this.VALID_HTTP_STATUSES)
      .then(() => {
        if (!isRequestTooLong) {
          clearTimeout(this.requestTimoutId);

          this.setState({
            receiving: false,
            isSubmitAllowed: true
          });

          if (typeof callback === 'function') {
            callback();
          }
        }
      })
      .catch(() => {
        if (!isRequestTooLong) {
          clearTimeout(this.requestTimoutId);

          let offset = this.SCROLL_OFFSET;
          if (browser().isMobile) {
            offset += constants.MOBILE_TOOLBAR_HEIGHT;
          }

          if (browser().isTablet) {
            offset += constants.TABLET_TOOLBAR_HEIGHT;
          }

          scrollToElement(this.addressFinder, offset);

          this.setState({
            receiving: false,
            isSubmitAllowed: false,
            showErrorMessage: true
          });
        }
      });
  }

  clearAddresses() {
    this.setState({ addresses: [] });
  }

  handlePostCodeUpdate(postCode) {
    if (COUNTRY !== 'IE') { // TODO: remove condition when PCC is prepared for Ireland
      const normalizedPostCode = normalizePostCode(postCode);

      if (this.postCodeField.isValid() && postCode !== normalizedPostCode) {
        this.postCodeField.updateValue(normalizedPostCode);
      }
    }

    this.clearAddresses();
    this.setPostalSectorHook(true);
    this.setState({
      showErrorMessage: false,
      isSubmitAllowed: true
    });
  }

  prepareAddressData(address) {
    const { props } = this;
    let newStreet = [];
    let newStreet2 = [];
    let currentSplitter;
    const maxAddressLengths = maxInputLengths.addressLine;

    Object.keys(props.autofillFields).forEach((fieldName) => {
      const addressFieldName = props.autofillFields[fieldName];

      if (!address[addressFieldName]) {
        address[addressFieldName] = '';
      }
    });

    if (address.street.length > maxAddressLengths) {
      // if there is nothing in street2, we can split street if it's too long
      if (address.street2.length === 0) {
        const splitters = [', ', ' '];
        // first we try to split by coma, then by space and other separator can be added
        for (let s = 0; s < splitters.length; s++) {
          newStreet = [];
          newStreet2 = [];
          currentSplitter = splitters[s];
          const splitAddress = address.street.split(splitters[s]);
          for (let i = 0; i < splitAddress.length; i++) {
            const currentLength = newStreet.reduce((pv, cv) => pv + cv.length, 0);
            if (currentLength + splitAddress[i].length +
              ((newStreet.length - 1) * splitters[s].length) <= maxAddressLengths) {
              newStreet.push(splitAddress[i]);
            } else {
              newStreet2.push(splitAddress[i]);
            }
          }

          const address2Length =
            newStreet2.reduce((pv, cv) => pv + cv.length, 0) +
            ((newStreet2.length - 1) * splitters[s].length);

          // if we fit all the text, we don't need to do more
          if (address2Length <= maxAddressLengths) {
            break;
          }
        }

        address.street = newStreet.join(currentSplitter);
        address.street2 = newStreet2.join(currentSplitter);

        // street is required, so in case the name is too long,
        // we just truncate it and put it in address1
        if (address.street.length === 0) {
          address.street = truncateText(address.street2, maxAddressLengths);
          address.street2 = '';
        }

        // we don't care about the rest in address2
        if (address.street2.length > maxAddressLengths) {
          address.street2 = truncateText(address.street2, maxAddressLengths);
        }

      } else {
        address.street = truncateText(address.street, maxAddressLengths);
      }
    }
  }

  updateFields(address) {
    const { props, context } = this;

    Object.keys(props.autofillFields).forEach((inputName) => {
      const input = context.parentForm.getItem(inputName);
      if (input) {
        input.updateValue(address[props.autofillFields[inputName]]);
      }
    });
  }

  fillForm(address) {
    this.prepareAddressData(address);
    this.updateFields(address);
    this.clearAddresses();
  }

  render() {
    const { props, state } = this;
    const isPostCodeValid = this.postCodeField ? this.postCodeField.isValid() : true;
    const classes = ['dc-address-finder'];
    const finderWrapperClasses = ['dc-address-finder__wrapper', 'dc-clearfix'];

    if (props.classes) {
      classes.push(props.classes);
    }

    if (!props.findEnabled) {
      finderWrapperClasses.push('dc-address-finder__wrapper--no-find-button');
    }

    return (
      <div
        data-component="AddressFinder"
        className={classes.join(' ')}
        ref={(addressFinder) => { this.addressFinder = addressFinder; }}
      >
        <div className={finderWrapperClasses.join(' ')}>
          <div className="dc-address-finder__input">
            <FormItem
              ref={(input) => { this.submitOnOff = input; }}
              name="allowSubmit"
              type="hidden"
              customFormat={new RegExp(this.SUBMIT_TURN_ON)}
            />
            <FormItem
              ref={(item) => { this.postCodeField = item; }}
              name="postCode"
              value={props.postCode}
              type="text"
              label={props.label}
              hint={props.hint}
              errorMessage={props.errorMessage}
              customFormat={props.postCodeRegEx}
              progressiveValidation={props.progressivePostCodeRegEx}
              onValueUpdate={this.handlePostCodeUpdate}
              isRequired={props.postCodeRequired}
            />
          </div>
          {props.findEnabled &&
            <div className="dc-address-finder__button">
              <Button
                type="button"
                onClick={this.findAddresses}
                disabled={!isPostCodeValid}
                workInProgress={state.receiving}
                tooltip={state.showErrorMessage ? props.unknownPostcodeMessage : ''}
                tooltipType="negative"
                tooltipArrow={browser().isTouch ? 'top' : 'left'}
                fadeInOut
              > {state.receiving ? props.buttonLabelProgress : props.buttonLabel}
              </Button>
            </div>
          }
        </div>

        {(this.state.addresses.length > 0) &&
        <div>
          <ul className="dc-address-finder__dropdown dc-border">
            {this.state.addresses.map((address, i) => (
              <li
                className="dc-address-finder__dropdown__item dc-border-bottom dc-background-empty"
                key={i}
                onClick={() => {
                  this.fillForm(address);
                }}
              >
                <div className="dc-text-middle">
                  {[address.postcode, address.street, address.streetAlt, address.city]
                    .filter(Boolean).join(', ')}
                </div>
              </li>
            ))}
          </ul>
        </div>
        }
        {(this.state.addresses.length > 0) &&
        <div>
          <span className="dc-link dc-text-small" onClick={this.clearAddresses}>
            {props.enterManuallyLabel}
          </span>
        </div>
        }
      </div>
    );
  }
}

AddressFinder.contextTypes = {
  parentForm: PropTypes.object
};

AddressFinder.propTypes = {
  autofillFields: PropTypes.shape({}),
  /**
   * Display or hide Find button
   */
  findEnabled: PropTypes.bool,
  postCode: PropTypes.string,
  postCodeRequired: PropTypes.bool,
  postCodeRegEx: PropTypes.instanceOf(RegExp),
  progressivePostCodeRegEx: PropTypes.instanceOf(RegExp),
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonLabelProgress: PropTypes.string,
  enterManuallyLabel: PropTypes.string,
  unknownPostcodeMessage: PropTypes.string,
  classes: PropTypes.string
};

AddressFinder.defaultProps = {
  autofillFields: {},
  findEnabled: true,
  postCode: '',
  postCodeRequired: true,
  postCodeRegEx: regularExpressions.POST_CODE,
  progressivePostCodeRegEx: regularExpressions.POST_CODE_PROGRESSIVE,
  errorMessage: '',
  label: '',
  hint: '',
  buttonLabel: 'Find',
  buttonLabelProgress: 'Finding',
  enterManuallyLabel: 'Enter address manually',
  unknownPostcodeMessage: 'Unfortunately we don\'t recognise your postcode,' +
    'please amend it, or alternatively call us on 0123 456 789',
  classes: ''
};

export default AddressFinder;
