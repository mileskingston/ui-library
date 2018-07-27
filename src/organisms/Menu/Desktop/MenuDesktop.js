import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../molecules/Icon/Icon';
import itemTypes from '../itemTypes';

import './MenuDesktop.styl';


/**
 * How many milliseconds to wait on a navigation
 * root item before sub menu appears.
 * @type {number}
 */
const SHOW_SUBMENU_DELAY_DEFAULT = 500;

let Link;

class MenuDesktop extends React.PureComponent {
  constructor(...params) {
    super(...params);

    this.showSubmenuTimeoutId = null;
    this.onMouseOverItem = this.onMouseOverItem.bind(this);
    this.onMouseLeaveContainer = this.onMouseLeaveContainer.bind(this);
    this.onMouseLeaveItem = this.onMouseLeaveItem.bind(this);

    Link = this.props.linkComponent;

    this.state = {
      showSubmenu: false,
      isMounted: false
    };
  }

  componentDidMount() {
    // For correct SSR need twice render. Once for hydrate and second for client changes only
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isMounted: true
    });
  }

  /**
   * Defer showing menu for 500 milliseconds.
   */
  onMouseOverItem() {
    if (!this.state.showSubmenu) {
      this.showSubmenuTimeoutId = setTimeout(() => {
        // eslint-disable-next-line react/no-set-state
        this.setState({
          showSubmenu: true
        });
      }, this.props.showSubMenuDelay);
    }
  }

  onMouseLeaveContainer() {
    if (this.showSubmenuTimeoutId) {
      clearTimeout(this.showSubmenuTimeoutId);
    }

    // eslint-disable-next-line react/no-set-state
    this.setState({
      showSubmenu: false
    });
  }

  onMouseLeaveItem() {
    if (!this.state.showSubmenu) {
      if (this.showSubmenuTimeoutId) {
        clearTimeout(this.showSubmenuTimeoutId);
      }
    }
  }

  /**
   * Returns homepage icon navigation element.
   * @returns {React.Element}
   */
  getHomeLink() {
    if (!this.props.homeLink) {
      return null;
    }
    return (
      <li
        data-element="Item"
        key={0}
      >
        <Link
          aria-label={this.props.homeLink}
          data-element="Link"
          onClick={// eslint-disable-line react/jsx-no-bind
            this.selectItem.bind(this, this.props.homeLink, this.props.homeLink, 1, itemTypes.HOME)
          }
          path={this.props.homeURL}
          href={this.props.homeURL}
          role="menuitem"
        >
          <Icon icon="House" />
        </Link>
      </li>
    );
  }

  selectItem(department, label, level, type, event) {
    this.props.menuItemClick(event, department, label, level, type);
  }

  /**
   * Returns either <a> or <span>,
   * depending on element's target type.
   * @param el
   * @returns {React.Element}
   */
  renderLink(el, department, level) {
    let link = null;
    if (el.targetType === itemTypes.NOT_CLICKABLE) {
      link = (
        <span
          dangerouslySetInnerHTML={{ __html: el.label }}
        />
      );
    } else {
      link = (
        <a
          href={el.link}
          onClick={this.selectItem.bind(this, department, el.label, level, el.targetType)} // eslint-disable-line react/jsx-no-bind
        >
          <span // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: el.label }}
          /><Icon icon="ArrowRight" />
        </a>
      );
    }

    return link;
  }

  /**
   * Returns sub menu for given tree.
   * @param tree
   * @returns {StatelessComponent}
   */
  renderSubmenu(tree, department) {
    if (!this.state.isMounted) {
      return null;
    }
    return tree.map((column, i) => (
      <div
        data-element="SubMenuColumn"
        key={i}
      >
        {column.map((elLevel1, j) => (
          <div
            data-element="SubMenuCategory"
            key={j}
          >
            <strong data-element="SubMenuCategoryTitle">
              {this.renderLink(elLevel1, department, 2)}
            </strong>
            <ul>
              {elLevel1.nav.map((elLevel2, k) => (
                <li key={k}>
                  {this.renderLink(elLevel2, department, 3)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ));
  }

  /**
   * Returns banner column for given navigation item.
   * @param tree
   * @returns {StatelessComponent}
   */
  renderBanners(banners) {
    if (!this.state.isMounted) {
      return null;
    }
    return (
      <div
        className="SubMenuColumn--banners"
        data-element="SubMenuColumn"
      >
        {banners.map((banner, j) => (
          <a
            href={banner.link}
            key={j}
          >
            <img
              alt={banner.alt}
              src={banner.src}
            />
          </a>
        ))}
      </div>
    );
  }


  /**
   * Returns features section for given navigation item.
   * @param features
   * @returns {XML}
   */
  renderFeatures(features) {
    if (!this.state.isMounted) {
      return null;
    }
    return (
      <div data-element="Features">
        {features.map((feature, j) => (
          <div
            className="feature"
            key={j}
          >
            <a href={feature.link}>
              <img
                alt={feature.text}
                src={feature.src}
              />
            </a>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { props } = this;

    const items = props.tree.map((m, i) => (
      <li
        data-element="Item"
        key={i + 1}
        onMouseLeave={this.onMouseLeaveItem}
        onMouseOver={this.onMouseOverItem}
      >
        <a
          data-element="Link"
          href={m.link}
          onClick={this.selectItem.bind(this, m.label, m.label, 1, itemTypes.UCMS)} // eslint-disable-line react/jsx-no-bind
        >
          {m.label}
        </a>
        <div data-element="SubMenu">
          {m.nav ? this.renderSubmenu(m.nav, m.label) : null}
          {m.banners ? this.renderBanners(m.banners) : null}
          {m.features ? this.renderFeatures(m.features) : null}
        </div>
      </li>
    ));

    const allItems = [this.getHomeLink()].concat(items);

    const classNames = [];
    if (this.state.showSubmenu) {
      classNames.push('subMenuActive');
    }

    return (
      <ul
        className={classNames.join(' ')}
        data-component="Menu"
        onMouseLeave={this.onMouseLeaveContainer}
      >
        {allItems}
      </ul>
    );
  }
}

MenuDesktop.displayName = 'MenuDesktop';

MenuDesktop.propTypes = {
  menuItemClick: PropTypes.func,
  showSubMenuDelay: PropTypes.number,
  tree: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    nav: PropTypes.arrayOf(PropTypes.array)
  })).isRequired,
  linkComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  homeLink: PropTypes.string,
  homeURL: PropTypes.string
};

MenuDesktop.defaultProps = {
  menuItemClick: () => {},
  showSubMenuDelay: SHOW_SUBMENU_DELAY_DEFAULT,
  linkComponent: props => <a {...props}>{props.children}</a>, // eslint-disable-line react/prop-types
  homeLink: undefined,
  homeURL: undefined
};

export default MenuDesktop;
