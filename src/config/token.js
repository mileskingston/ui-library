import settings from './settings';
import { getCookie } from '../helpers/cookies';

export function decodeToken(encodedToken) {
  if (!encodedToken) return {};

  const base64Url = encodedToken.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(window.atob(base64));
}

export function enhanceToken(token) {
  return {
    ...token,

    isValid: function() {
      return !!this.cid && !!this.csu;
    },
    isSignInTimePassed: function() {
      return !this.isValid() || (this.csu * 1000) <= Date.now();
    },
    getSignInRemainingTimeInMiliseconds: function() {
      return Math.max(0, (this.csu * 1000) - Date.now());
    }
  };
}

export default enhanceToken(decodeToken(getCookie(`store-${settings.site_name}`)));
