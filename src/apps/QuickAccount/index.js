import PropTypes from 'prop-types';
import { withHandlers, mapProps, compose } from 'recompose';
import {
  emailRecognition,
  emailRecognitionImmediate,
  handleForgotPasswordClick,
  setResultMessage,
  handlePopupClose
} from './handlers';
import { VIEW_EMAIL_RECOGNITION } from './constants';
import stateSetup from './stateSetup';
import propsMapper from './propsMapper';
import { Popup } from '../../';
import './index.styl';

const setup = compose(
  stateSetup({
    autoComplete: true,
    email: '',
    recognitionInProgress: false,
    userName: '',
    reloadRequired: false,
    view: undefined, // Will take it from props, see stateSetup
    message: {}
  }),
  withHandlers({
    setResultMessage
  }),
  withHandlers({
    emailRecognition
  }),
  withHandlers({
    emailRecognitionImmediate,
    handleForgotPasswordClick,
    handlePopupClose
  }),
  mapProps(
    propsMapper
  )
);

const QuickAccount = setup(Popup);

QuickAccount.propTypes = {
  initialView: PropTypes.string,
  product: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    productId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    savePrice: PropTypes.string,
    wasPrice: PropTypes.string
  }),
  onEmailRecognitionResult: PropTypes.func,
  onPopupClose: PropTypes.func,
  onRegistrationResult: PropTypes.func,
  onRegistrationSuccess: PropTypes.func,
  onSignInResult: PropTypes.func,
  onSignInSuccess: PropTypes.func
};

QuickAccount.defaultProps = {
  initialView: VIEW_EMAIL_RECOGNITION,
  product: {},
  onEmailRecognitionResult: () => {},
  onPopupClose: () => {},
  onRegistrationResult: () => {},
  onRegistrationSuccess: () => {},
  onSignInResult: () => {},
  onSignInSuccess: () => {}
};

export default QuickAccount;
