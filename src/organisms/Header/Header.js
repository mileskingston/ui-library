/* eslint-disable react/no-multi-comp, react/no-set-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderItem from './HeaderItem/HeaderItem';
import SimpleLink from '../../molecules/SimpleLink/SimpleLink';
import HeaderSearch from '../HeaderSearch/HeaderSearch';

import './Header.styl';

const SEARCH_INPUT_SELECTOR =
  '[data-component="HeaderSearch"] [data-element="SearchInputContainer"] input';

let Link;

if (typeof THEME === 'undefined') {
  global.THEME = 'currys';
}

class Header extends PureComponent {

  static composeQaProp(deviceType, key) {
    return `${key}-${deviceType}`;
  }

  constructor(props) {
    super(props);
    this.toggleSearchExtended = this.toggleSearchExtended.bind(this);
    this._onScroll = this._onScroll.bind(this); // eslint-disable-line no-underscore-dangle
    Link = this.props.linkComponent;
    this.cancelClickHandler = false;

    this.state = {
      displaySearch: false
    };
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }
    this.searchInputEl = document.querySelector(SEARCH_INPUT_SELECTOR);
    this.wrapperEl = document.querySelector('[data-component="SlidingContent"]');
    window.addEventListener('scroll', this._onScroll); // eslint-disable-line no-underscore-dangle
    this._onScroll(); // eslint-disable-line no-underscore-dangle

    document.addEventListener('click', (e) => {
      if (
        this.state.displaySearch &&
        this.headerSearchForm &&
        !this.headerSearchForm.contains(e.target) &&
        document.body.contains(e.target) && // "Clear" button is already removed from DOM here
        !this.cancelClickHandler
      ) {
        this.toggleSearchExtended(e);
      }
      this.cancelClickHandler = false;
    });
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') {
      return;
    }
    window.removeEventListener('scroll', this._onScroll); // eslint-disable-line no-underscore-dangle
  }

  _onScroll() {
    if (typeof window === 'undefined') {
      return;
    }
    const pos = window.pageYOffset || document.documentElement.scrollTop;
    const sticky = pos > 45;
    if (this.wrapperEl) {
      this.wrapperEl.setAttribute('data-sticky-header', sticky);
    }
  }

  /**
   * Mobile devices allow to focus/blur only when triggered from within an another event
   * therefore handling click Event and triggering focus/blur
   * note: displaySearch variable shows old state, hence reversed logic of blur/focus
   * @param {Event} e
   */
  toggleSearchExtended(e) {
    this.setState({ displaySearch: !this.state.displaySearch });
    if (this.searchInputEl) {
      if (!this.state.displaySearch) {
        this.searchInputEl.focus();
      } else {
        this.searchInputEl.blur();
      }
    }
    this.props.searchButtonHandler();
  }

  render() {
    const { props, state } = this;

    const searchSectionClasses = ['dc-header__section-search'];

    if (state.displaySearch) {
      searchSectionClasses.push('dc-header__section-search--visible');
    }

    const searchSection = (
      <div className={searchSectionClasses.join(' ')}>
        <HeaderSearch
          currency={props.searchConfiguration.currency}
          query={props.searchConfiguration.query}
          displaySearch={state.displaySearch}
          loadAutocomplete={props.searchConfiguration.getSuggestions}
          formRef={(formEl) => { this.headerSearchForm = formEl; }}
          results={props.searchConfiguration.suggestions}
          clearResults={props.searchConfiguration.clearSuggestions}
          searchAction={props.searchConfiguration.searchAction}
          searchButtonLabel={props.searchButtonLabel}
        />
      </div>
    );

    return (
      <div className="dc-header-wrapper">
        <div className={`dc-header dc-header--site-${THEME}`}>
          <div className="dc-header__section-logo">
            <Link
              aria-label={props.homeLink}
              href={props.homeURL}
            >
              <HeaderLogo
                desktopLogoSrc={props.desktopLogoSrc}
                handHeldLogoSrc={props.handHeldLogoSrc}
                desktopLogoSizeFactory={props.desktopLogoSizeFactory}
                handHeldLogoSizeFactory={props.handHeldLogoSizeFactory}
              />
            </Link>
          </div>
          {props.deviceType === 'desktop' && searchSection}
          <div className="dc-header__section-links">
            {props.menuItems.map(item => (item.render
                ? item.render()
                : (
                  <HeaderItem
                    {...item}
                    qa={Header.composeQaProp(props.deviceType, item.key)}
                    onClick={item.onClick ? e => item.onClick(e, this) : undefined}
                  />
                )
            ))}
          </div>
        </div>
        {props.deviceType !== 'desktop' && searchSection}
      </div>
    );
  }
}

Header.displayName = 'Header';

Header.propTypes = {
  desktopLogoSrc: PropTypes.string.isRequired,
  desktopLogoSizeFactory: PropTypes.func,
  deviceType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  /**
   * If not provided, `desktopLogoSrc` will be used for hand-held devices
   */
  handHeldLogoSrc: PropTypes.string,
  handHeldLogoSizeFactory: PropTypes.func,
  /**
   * Used as aria-label for Logo link
   */
  homeLink: PropTypes.string,
  /**
   * Url of homepage
   */
  homeURL: PropTypes.string.isRequired,
  /**
   * @deprecated - use deviceType instead
   */
  isTouch: PropTypes.bool,
  linkComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Items to render in header.
   *
   * Pass either object with `render` property to render item on your own or pass object
   * with these properties to transform it to HeaderItem component:
   *
   * - `key` - unique key for array rendering
   * - `icon`
   * - `label`
   * - `className` - will be added to normal HeaderItem classes
   * - `href`
   * - `badge` - object with badge specification
   *   - `color` - color or function which receives all HeaderItem props
   *   - `count`
   *   - `displayZero` - display even if count is 0?
   * - onClick (receives MouseEvent and Header instance as parameters)
   */
  menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.string,
      label: PropTypes.string,
      className: PropTypes.string,
      href: PropTypes.string,
      badge: HeaderItem.propTypes.badge,
      /**
       * @param {MouseEvent} e
       * @param {Header} header
       */
      onClick: PropTypes.func
    }),
    PropTypes.shape({
      render: PropTypes.func.isRequired
    })
  ])),
  searchButtonLabel: PropTypes.string,
  searchButtonHandler: PropTypes.func,
  searchConfiguration: PropTypes.shape({
    currency: PropTypes.string,
    searchAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    getSuggestions: PropTypes.func.isRequired,
    clearSuggestions: PropTypes.func.isRequired,
    query: PropTypes.string,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
      brand: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.string,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      reviewScore: PropTypes.string,
      url: PropTypes.string
    })).isRequired
  }).isRequired
};

Header.defaultProps = {
  desktopLogoSizeFactory: HeaderLogo.defaultProps.desktopLogoSizeFactory,
  deviceType: 'desktop',
  handHeldLogoSizeFactory: HeaderLogo.defaultProps.handHeldLogoSizeFactory,
  handHeldLogoSrc: undefined,
  homeLink: 'Home',
  isTouch: false,
  linkComponent: SimpleLink,
  menuItems: [],
  searchButtonLabel: 'Search',
  searchButtonHandler: () => {}
};

export default Header;
