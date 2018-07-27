import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import OnOffSwitch from '../../molecules/OnOffSwitch/OnOffSwitch';
import ExpandableText from '../../molecules/ExpandableText/ExpandableText';
import Icon from '../../molecules/Icon/Icon';
import { H2 } from '../../molecules/Heading/Heading';

import './StayInTouchBlock.styl';
import Checkbox from '../../molecules/Checkbox/Checkbox';

import themeVariables from '../../themes/variables';

/* eslint-disable max-len */

/**
 * Behavior of this component:
 *
 * - When any of checkboxes from the list is selected, whole group is active.
 * - When last checkbox is deselected whole group gets inactive.
 * - When group has only one checkbox and group is toggled active - the checkbox get active automatically.
 * - When group has no items it behaves like single toggle
 * - Checkbox name is **NOT** magically composed. What is send to `item.name` became name of the checkbox input.
 */

/* eslint-enable max-len */

class StayInTouchBlock extends PureComponent {

  static buildWrapperClassNames(props) {
    const classNames = [
      'dc-stay-in-touch-block',
      `dc-stay-in-touch-block--border-${props.borderStyle}`
    ];

    return classNames.join(' ');
  }

  static buildHeaderClassNames(props) {
    const classNames = [
      'dc-stay-in-touch-block__header',
      `dc-stay-in-touch-block__header--size-${props.headerSize}`
    ];

    return classNames.join(' ');
  }

  static buildContactChannelBoxClassNames(group, items) {
    const classNames = [
      'dc-stay-in-touch-block__content__contact-channels-box'
    ];

    if (items.every(item => !item.isChecked)) {
      classNames.push('dc-stay-in-touch-block__content__contact-channels-box--no-selection');
    }

    if (group.hasValidationError) {
      classNames.push('dc-stay-in-touch-block__content__contact-channels-box--has-error');
    }

    return classNames.join(' ');
  }

  static processGroupsFromProps(props) {
    const groupsFromProps = {};

    props.contactChannelGroups.forEach((group) => {
      groupsFromProps[group.name] = {
        isToggleActive: group.isActive || (group.items && group.items.some(item => item.isChecked)),
        errorMessage: group.errorMessage,
        items: group.items
          ? group.items.map(item => ({
            name: item.name,
            isChecked: item.isChecked === true
          }))
          : []
      };
    });

    return groupsFromProps;
  }

  static renderHeader(props) {
    return (
      <h3 className={StayInTouchBlock.buildHeaderClassNames(props)}>
        {props.headerIcon && <Icon icon={props.headerIcon} />}
        {props.headerText}
      </h3>
    );
  }

  static renderExpandableText(props) {
    return (
      <ExpandableText
        textLess={(
          <Fragment>
            <span>{props.privacyBoxLabel}</span>
            <Icon icon="ChevronRight" rotate={270} />
          </Fragment>
        )}
        textMore={(
          <Fragment>
            <span>{props.privacyBoxLabel}</span>
            <Icon icon="ChevronRight" rotate={90} />
          </Fragment>
        )}
        renderer={ExpandableText.blockRenderer}
        toggleInteraction={props.expandableTextInteraction}
      >
        {props.privacyBoxDescription}
      </ExpandableText>
    );
  }

  static addIconToDescription(group, icon) {
    return (
      <div>
        {group.toggleDescription.split(' ').slice(0, -1).join(' ')}
        {' '}
        <span className="dc-text-nowrap">
          {group.toggleDescription.split(' ').slice(-1)}
          {icon}
        </span>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      activePopup: null,
      groups: StayInTouchBlock.processGroupsFromProps(props)
    };

    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.switchToggle = this.switchToggle.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
  }

  openPopup(e, groupName) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      activePopup: groupName
    });
  }

  closePopup() {
    this.setState({
      activePopup: null
    });
  }

  /**
   * @param {string} groupName
   * @param {boolean=} forceValue If set, new value will be set instead of negating current value
   */
  async switchToggle(groupName, forceValue) {
    const isToggleActive = forceValue !== undefined
      ? forceValue
      : !this.state.groups[groupName].isToggleActive;

    let items = this.state.groups[groupName].items.map(item => ({ ...item }));

    const previousState = this.state;
    let changedCheckboxes = [];

    // Check the checkbox when group has only one
    if (isToggleActive && items.length === 1) {
      items[0].isChecked = true;

      changedCheckboxes.push({
        name: items[0].name,
        isChecked: items[0].isChecked
      });
    }

    // Uncheck all checkboxes on toggle deactivation
    if (!isToggleActive) {
      items = items.map(item => ({
        ...item,
        isChecked: false
      }));

      changedCheckboxes = items;
    }

    this.setState({
      groups: {
        ...this.state.groups,
        [groupName]: {
          ...this.state.groups[groupName],
          errorMessage: undefined,
          isToggleActive: isToggleActive,
          items: items
        }
      }
    });

    if (changedCheckboxes.length) {
      try {
        await this.props.onCheckboxChanged(changedCheckboxes);
      } catch (errorMessage) {
        this.setState({
          ...previousState,
          groups: {
            ...previousState.groups,
            [groupName]: {
              ...previousState.groups[groupName],
              errorMessage
            }
          }
        });
      }
    }
  }

  /**
   * @param {string} groupName
   * @param {number} itemIndex
   * @param {boolean=} forceValue If set, new value will be set instead of negating current value
   */
  async toggleCheckbox(groupName, itemIndex, forceValue) {
    const items = this.state.groups[groupName].items.map(item => ({ ...item }));

    items[itemIndex].isChecked = forceValue !== undefined
      ? forceValue
      : !items[itemIndex].isChecked;

    let { isToggleActive } = this.state.groups[groupName];

    // Deactivate group toggle when all checkboxes are unchecked
    if (items.every(item => !item.isChecked)) {
      isToggleActive = false;
    }

    const previousState = this.state;

    this.setState({
      groups: {
        ...this.state.groups,
        [groupName]: {
          ...this.state.groups[groupName],
          errorMessage: undefined,
          isToggleActive: isToggleActive,
          items: items
        }
      }
    });

    try {
      await this.props.onCheckboxChanged([
        {
          name: items[itemIndex].name,
          isChecked: items[itemIndex].isChecked
        }
      ]);
    } catch (errorMessage) {
      this.setState({
        ...previousState,
        groups: {
          ...previousState.groups,
          [groupName]: {
            ...previousState.groups[groupName],
            errorMessage
          }
        }
      });
    }
  }

  isGroupActive(groupName) {
    return this.state.groups[groupName].isToggleActive;
  }

  isCheckboxChecked(groupName, checkboxIndex) {
    return this.state.groups[groupName].items[checkboxIndex].isChecked;
  }

  renderGroup(group) {
    return (
      <Fragment key={group.name}>
        {this.renderGroupSwitch(group)}
        {this.state.groups[group.name].errorMessage &&
          <p className="dc-stay-in-touch-block__content__error-message">
            {this.state.groups[group.name].errorMessage}
          </p>
        }
        <CSSTransitionGroup
          className="dc-stay-in-touch-block__transition-group"
          component="div"
          transitionName="dc-transition"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {this.isGroupActive(group.name) && group.items &&
            this.renderContactChannelsBox(group)
          }
        </CSSTransitionGroup>
      </Fragment>
    );
  }

  renderGroupSwitch(group) {
    const { props } = this;

    const isGroupActive = this.isGroupActive(group.name);

    const icon = group.providesPopup && (
      <a
        className="dc-link"
        href="#more-info"
        onClick={e => this.openPopup(e, group.name)}
        data-interaction={group.popupIconInteraction}
      >
        <Icon icon="InfoAlternative" />
      </a>
    );

    return (
      <OnOffSwitch
        id="stayInTouchSwitch"
        active={isGroupActive}
        onSwitch={() => this.switchToggle(group.name)}
        name={group.name}
        activeColor={themeVariables.dcColorLink.css}
        description={icon
          ? StayInTouchBlock.addIconToDescription(group, icon)
          : group.toggleDescription
        }
        // eslint-disable-next-line no-nested-ternary
        label={group.toggleLabelFactory
          ? group.toggleLabelFactory(isGroupActive)
          : (isGroupActive ? props.onLabel : props.offLabel)
        }
      />
    );
  }

  renderContactChannelsBox(group) {
    const { state } = this;

    return (
      <div
        className={StayInTouchBlock.buildContactChannelBoxClassNames(
          group,
          state.groups[group.name].items
        )}
      >
        <p>{group.description}</p>
        <div className="dc-stay-in-touch-block__content__contact-channels-box__items">
          {group.items.map((item, itemIndex) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.label}
              checked={this.isCheckboxChecked(group.name, itemIndex)}
              onCheck={() => this.toggleCheckbox(group.name, itemIndex)}
              value="1"
              id={`stayInTouch${item.name}`}
            />
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { props, state } = this;

    const renderExpandableTextOutside = [
      'outer',
      'outer-heading-bg'
    ].indexOf(props.borderStyle) > -1;

    return (
      <div className="dc-stay-in-touch-wrapper">
        <div className={StayInTouchBlock.buildWrapperClassNames(props)}>
          {props.displayHeader && StayInTouchBlock.renderHeader(props)}
          <div className="dc-stay-in-touch-block__content">
            {props.contactChannelGroups.map(this.renderGroup)}
          </div>
          {!renderExpandableTextOutside && StayInTouchBlock.renderExpandableText(props)}
          {state.activePopup &&
            props.popupRenderer(state.activePopup, this.closePopup, props, state)
          }
        </div>
        {renderExpandableTextOutside && StayInTouchBlock.renderExpandableText(props)}
      </div>
    );
  }
}

StayInTouchBlock.displayName = 'StayInTouchBlock';

StayInTouchBlock.propTypes = {
  borderStyle: PropTypes.oneOf([
    'none',
    'inner',
    'outer',
    'outer-heading-bg'
  ]),
  contactChannelGroups: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Unique name for group
     */
    name: PropTypes.string,
    /**
     * Description message for group
     */
    description: PropTypes.string,
    /**
     * If `true` display icon next to toggle description.
     */
    providesPopup: PropTypes.bool,
    /**
     * Description of group toggle
     */
    toggleDescription: PropTypes.string,
    /**
     * Function which receives boolean as parameter and return string for toggle label.
     * Props `onLabel` resp. `offLabel` are used when not provided.
     */
    toggleLabelFactory: PropTypes.func,
    /**
     * When any item has `isChecked === true` whole group will be rendered as active by default.
     */
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      isChecked: PropTypes.bool
    })),
    /**
     * If `true` description and channels box will display error state
     */
    hasValidationError: PropTypes.bool,
    /**
     * If set, error message will be displayed beneath the toggle.
     * Can be used for network errors etc.
     */
    errorMessage: PropTypes.string,
    popupIconInteraction: PropTypes.string
  })),
  displayHeader: PropTypes.bool,
  headerComponent: PropTypes.func,
  headerIcon: PropTypes.string,
  /**
   * Affects size of text and size of icon
   */
  headerSize: PropTypes.oneOf([
    'smaller',
    'normal',
    'bigger'
  ]),
  headerText: PropTypes.node,
  offLabel: PropTypes.string,
  /**
   * Callback called on checkbox value change.
   * Receives array of changed item objects `{name: string, isChecked: boolean}`.
   *
   * If rejected promise is returned. State is reverted to it's previous state.
   * Reject with some message to display error:
   *
   * Promise.reject('Error happened')
   *
   * @param {array} items
   */
  onCheckboxChanged: PropTypes.func,
  onLabel: PropTypes.string,
  /**
   * Renders popup according to active popup group.
   *
   * **Do not forget to set enable popup for specific group by setting `providesPopup` value!**
   *
   * @param {string} activeGroup group name of active group
   * @param {function} closePopup function to call when popup should be closed
   * @param {object} parentProps StayInTouchBlock component props
   * @param {object} parentState StayInTouchBlock component state
   */
  popupRenderer: PropTypes.func,
  privacyBoxDescription: PropTypes.node,
  privacyBoxLabel: PropTypes.node,
  expandableTextInteraction: PropTypes.string
};

StayInTouchBlock.defaultProps = {
  borderStyle: 'none',
  contactChannelGroups: [],
  displayHeader: true,
  headerComponent: H2,
  headerIcon: undefined,
  headerSize: 'normal',
  headerText: '[headerText]',
  offLabel: 'Off',
  onCheckboxChanged: () => {},
  onLabel: 'On',
  popupRenderer: () => {},
  privacyBoxDescription: '[privacyBoxDescription]',
  privacyBoxLabel: '[privacyBoxLabel]',
  expandableTextInteraction: undefined
};

export default StayInTouchBlock;
