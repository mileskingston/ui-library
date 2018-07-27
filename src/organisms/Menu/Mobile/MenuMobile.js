/* eslint-disable react/no-set-state, react/jsx-no-bind, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../molecules/Icon/Icon';
import itemTypes from '../itemTypes';

import './MenuMobile.styl';

const COMPONENT_NAME = 'MenuMobile';
let Link;

// ----------------------------------------------- React Element
class MenuMobile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.wrapper = null;
    this.goLevelBack = this.goLevelBack.bind(this);
    this.state = {
      selections: []
    };

    Link = this.props.linkComponent;
  }

  componentDidUpdate() {
    this.resetAllUlHeights();
    // set first column height to currently visible ul's height
    // this prevents showing of unnecessary scroll bar
    if (this.state.selections.length) {
      let el = this.getLastUl();
      if (el) {
        const lastUlHeight = `${el.offsetHeight}px`;
        while (el.tagName.toUpperCase() !== 'DIV' &&
          el.dataset &&
          el.dataset.component !== COMPONENT_NAME
        ) {
          el = el.parentElement;
          if (el.tagName.toUpperCase() === 'UL') {
            el.style.height = lastUlHeight;
          }
        }
      }
    }
  }

  getLastUl() {
    return this.state.selections.length
      ? this.state.selections[this.state.selections.length - 1].ul
      : null;
  }

  resetAllUlHeights() {
    /* eslint-disable no-param-reassign */
    [...this.wrapper.querySelectorAll('[data-element="Column"]')].forEach((ul) => {
      ul.style.height = null;
    });
    /* eslint-enable no-param-reassign */
  }
  
  selectItem(departmentEl, level, index, el, type, event) {
    this.props.menuItemClick(event, departmentEl.label, el.label, level + 1, type);
    if (level === 2) {
      return;
    }
    // get clicked <li> and save it's nested <ul>'s height
    let domEl = event.target;
    while (domEl.tagName.toUpperCase() !== 'LI') {
      domEl = domEl.parentElement;
    }
    const ul = domEl && domEl.querySelector('ul');

    const selections = this.state.selections.slice(0);
    selections[level] = { index, el, ul };
    this.setState({
      selections
    });
  }

  goLevelBack() {
    const sliceEnd = this.state.selections.length - 1;
    this.setState({
      selections: this.state.selections.slice(0, sliceEnd)
    });
  }

  /**
   * Returns either <a> or <span>,
   * depending on element's target type.
   * @param el
   * @returns {React.Element}
   */
  renderLink(el, onClick) {
    const unclickable = el.targetType === itemTypes.NOT_CLICKABLE ||
      (el.nav && el.nav.length > 0);
    const chevronIconRight = unclickable
      ? (<Icon icon="ArrowRight" />)
      : null;
    const path = unclickable ? null : el.link;
    return (
      <Link
        aria-label={el.label}
        className="link clearfix"
        onClick={onClick}
        path={path}
        role="menuitem"
      >
        {
          chevronIconRight
        }
        <span
          className="caption"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: el.label }}
        />
      </Link>
    );
  }

  render() {
    if (typeof window === 'undefined') {
      return null;
    }
    const { tree } = this.props;
    const { selections } = this.state;

    const toolbar = typeof selections[0] !== 'undefined' ? (
      <div data-element="Toolbar">
        <div
          className="clearfix"
          data-element="Controls"
        >
          <button
            data-element="BackButton"
            onClick={this.goLevelBack}
          >
            <Icon icon="ArrowRight" style={{ transform: 'rotate(180deg)' }} />
          </button>

          {selections[1]
            ? (
              <a
                data-element="ProductListingButton"
                href={selections[1].el.link}
              >
                <Icon icon="List" />
              </a>
            )
            : null
          }

          <div data-element="Title">
            {selections[selections.length - 1].el.label}
          </div>
        </div>
        <div data-element="Breadcrumbs">
          {selections.map(item => item.el.label).join(' / ')}
        </div>
      </div>
    ) : null;

    return (
      <div
        data-component={COMPONENT_NAME}
        ref={(div) => { this.wrapper = div; }}
        role="menu"
      >
        {toolbar}
        <ul
          data-element="Column"
        >
          <li>
            <Link
              aria-label={this.props.homeLink}
              className="link clearfix"
              onClick={this.selectItem.bind(this,
                { label: this.props.homeLink },
                0,
                0,
                { label: this.props.homeLink },
                itemTypes.HOME)}
              path={this.props.homeURL}
              role="menuitem"
            >
              <Icon icon="ArrowRight" />
              <span className="caption">{this.props.homeLink}</span>
            </Link>
          </li>

          {tree.map((elLevel1, i) => {
            const isActiveL0 = (i === (selections[0] && selections[0].index));
            return (
              <li
                className={isActiveL0 ? 'active' : null}
                key={i}
              >
                {this.renderLink(
                  elLevel1,
                  this.selectItem.bind(
                    this,
                    elLevel1,
                    0,
                    i,
                    elLevel1,
                    itemTypes.UCMS
                  )
                )}

                <ul data-element="Column">
                  {elLevel1.nav.map((elLevel2Col, g) => (
                    elLevel2Col.map((elLevel2, j) => {
                      const compositeKey = `${g}${j}`;
                      const isActiveL1 =
                        (compositeKey === (selections[1] && selections[1].index));
                      return (
                        <li
                          className={isActiveL1 ? 'active' : null}
                          key={compositeKey}
                        >
                          {this.renderLink(
                            elLevel2,
                            this.selectItem.bind(
                              this,
                              elLevel1,
                              1,
                              compositeKey,
                              elLevel2,
                              itemTypes.UCMS
                            )
                          )}

                          <ul
                            data-element="Column"
                          >
                            {elLevel2.nav ? elLevel2.nav.map((elLevel3, k) => {
                              const isActiveL2 =
                                (k === (selections[2] && selections[2].index));

                              return (
                                <li
                                  className={isActiveL2 ? 'active' : null}
                                  key={k}
                                >
                                  {this.renderLink(
                                    elLevel3,
                                    this.selectItem.bind(
                                      this,
                                      elLevel1,
                                      2, null,
                                      elLevel3,
                                      itemTypes.UCMS
                                    )
                                  )}
                                </li>
                              );
                            }) : null}
                          </ul>
                        </li>
                      );
                    })
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
MenuMobile.displayName = 'MenuMobile';
// ----------------------------------------------- prop validation
MenuMobile.propTypes = {
  menuItemClick: PropTypes.func,
  tree: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    nav: PropTypes.arrayOf(PropTypes.array)
  })).isRequired,
  linkComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  homeLink: PropTypes.string,
  homeURL: PropTypes.string
};

MenuMobile.defaultProps = {
  menuItemClick: () => {},
  linkComponent: props => <a {...props}>{props.children}</a>, // eslint-disable-line react/prop-types
  homeLink: undefined,
  homeURL: undefined
};


// ----------------------------------------------- export
export default MenuMobile;
