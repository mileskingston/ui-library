import React from 'react';
import PropTypes from 'prop-types';

import './HeaderLogo.styl';

if (typeof THEME === 'undefined') {
  global.THEME = 'currys';
}

/**
 * PRIVATE component - use only in Header component!
 *
 * @private
 */
const HeaderLogo = props => (
  <div>
    <img
      className="dc-header-logo--desktop"
      alt={props.altFactory(THEME)}
      src={props.desktopLogoSrc}
      style={props.applySizeToStyles ? props.desktopLogoSizeFactory(THEME) : {}}
      {...props.desktopLogoSizeFactory(THEME)}
    />
    <img
      className="dc-header-logo--handheld"
      alt={props.altFactory(THEME)}
      src={props.handHeldLogoSrc || props.desktopLogoSrc}
      style={props.applySizeToStyles ? props.handHeldLogoSizeFactory(THEME) : {}}
      {...props.handHeldLogoSizeFactory(THEME)}
    />
  </div>
);

HeaderLogo.propTypes = {
  /**
   * Factory function for image `alt` attribute value.
   *
   * @param {string} theme
   */
  altFactory: PropTypes.func,
  /**
   * Should be calculated logo size applied also as style property?
   */
  applySizeToStyles: PropTypes.bool,
  /**
   * Logo file used on desktop
   */
  desktopLogoSrc: PropTypes.string.isRequired,
  /**
   * Logo file used on handHeld devices. If not set, desktop logo will be used.
   */
  handHeldLogoSrc: PropTypes.string,
  /**
   * Factory function for desktop logo image size.
   *
   * If `applySizeToStyles` is set tor `true` sizes are applied also as `style` attribute.
   *
   * Return object: {width: number, height: number}
   *
   * @param {string} theme
   */
  desktopLogoSizeFactory: PropTypes.func,
  /**
   * Factory function for handheld logo image size.
   *
   * If `applySizeToStyles` is set tor `true` sizes are applied also as `style` attribute.
   *
   * Return object: {width: number, height: number}
   *
   * @param {string} theme
   */
  handHeldLogoSizeFactory: PropTypes.func
};

HeaderLogo.defaultProps = {
  /**
   * @param {string} theme
   * @returns {string}
   */
  altFactory: theme => (
    theme === 'currys'
      ? 'Currys' : 'PCWorld'
  ),
  applySizeToStyles: true,
  handHeldLogoSrc: undefined,
  desktopLogoSizeFactory: () => ({
    width: 204,
    height: 60
  }),
  handHeldLogoSizeFactory: (theme) => {
    if (theme === 'currys') {
      return {
        width: 180,
        height: 32
      };
    }

    return {
      width: 161,
      height: 46
    };
  }
};

HeaderLogo.displayName = 'HeaderLogo';

export default HeaderLogo;
