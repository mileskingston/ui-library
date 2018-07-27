import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../../molecules/Link/Link';
import Icon from '../../molecules/Icon/Icon';
import { getMobileOS } from '../../helpers';

import './DropdownMenu.styl';

const whatInput = typeof window !== 'undefined'
  ? require('what-input')
  : {
    ask: () => undefined
  };

class DropdownMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpened: props.isOpened || false
    };

    this.toggleMouseHover = this.toggleMouseHover.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
    this.linkClick = this.linkClick.bind(this);
    this.handleClickOuter = this.handleClickOuter.bind(this);
    this.openMenu = this.toggleMouseHover.bind(this, true);
    this.closeMenu = this.toggleMouseHover.bind(this, false);

    this.isIOS = getMobileOS().isIOS;
  }

  componentDidMount() {
    if (window === 'undefined') return;
    if (this.props.automaticClose) {
      document.addEventListener('click', this.handleClickOuter);
    }

    this.rootNode.addEventListener('mouseenter', this.openMenu);
    this.rootNode.addEventListener('mouseleave', this.closeMenu);
  }

  componentWillUnmount() {
    if (window === 'undefined') return;
    document.removeEventListener('click', this.handleClickOuter);

    this.rootNode.removeEventListener('mouseenter', this.openMenu);
    this.rootNode.removeEventListener('mouseleave', this.closeMenu);
  }

  handleClickOuter(event) {
    if (!this.rootNode.contains(event.target)) {
      this.setState({
        isOpened: false
      });
      if (this.isIOS) {
        document.body.style.cursor = 'default';
      }
    }
  }

  toggleMouseHover(isOpened) {
    if (whatInput.ask('loose') !== 'touch' && whatInput.ask('loose') !== null) {
      this.setState({ isOpened });
    }
  }

  toggleClick(event) {
    if (whatInput.ask() !== 'mouse') {
      event.preventDefault();
    }

    this.setState({
      isOpened: !this.state.isOpened
    }, () => {
      if (this.state.isOpened && this.isIOS) {
        document.body.style.cursor = 'pointer';
      }
    });
  }

  linkClick(link) {
    this.setState({ isOpened: false });
    this.props.linkClickHandler(link);
  }

  render() {
    const { props, state } = this;
    const triggerClass = ['dc-menu-trigger'];
    const wrapperClasses = [
      'dc-menu-wrapper',
      `dc-menu-${state.isOpened ? 'opened' : 'closed'}`
    ].concat(this.props.additionalClassName);

    if (state.isOpened) {
      triggerClass.push('dc-clr-primary');
    }

    if (!props.isAnimated) {
      wrapperClasses.push('dc-menu--no-transitions');
    }

    return (
      <div
        data-qa={props.qa}
        ref={(element) => { this.rootNode = element; }}
        className={wrapperClasses.join(' ')}
      >
        <a
          href={props.links.homePage.path}
          className={triggerClass.join(' ')}
          onClick={this.toggleClick}
        >
          {props.icon &&
            <Icon icon={props.icon} />
          }
          {props.label &&
            <span className="dc-menu-label">{props.label}</span>
          }
        </a>
        <ul className="dc-menu">
          {Object.keys(props.links).map((key, i) => {
            const link = props.links[key];

            return (
              <li
                key={i}
                className={['dc-menu-item'].concat(link.classes || []).join(' ')}
                onClick={() => { this.linkClick(link); }}
                data-interaction={link.dataInteraction}
              >
                <props.linkComponent
                  qa={link.qa}
                  path={link.path}
                  icon={link.icon}
                  iconArrow={link.iconArrow}
                  label={link.label || ''}
                  isActive={link.isActive}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  qa: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  links: PropTypes.shape({}).isRequired,
  linkClickHandler: PropTypes.func.isRequired,
  linkComponent: PropTypes.func,
  isAnimated: PropTypes.bool,
  isOpened: PropTypes.bool,
  automaticClose: PropTypes.bool,
  additionalClassName: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]
  )
};

DropdownMenu.defaultProps = {
  qa: undefined,
  icon: undefined,
  label: undefined,
  isAnimated: true,
  isOpened: false,
  automaticClose: true,
  additionalClassName: [],
  linkComponent: Link
};

export default DropdownMenu;
