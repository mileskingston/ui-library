import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { translations } from '../../config';
import Icon from '../Icon/Icon';
import './Select.styl';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOpts: false,
      highlighted: -1, // represents index in props.options, not id!
      isFocused: false
    };

    this.defaultOption = translations.select_option;

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleDisabledItemClick = this.handleDisabledItemClick.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.clearSelect = this.clearSelect.bind(this);
    this.getSelectedOption = this.getSelectedOption.bind(this);
  }

  getSelectedOption() {
    const { options, selected } = this.props;
    const selectedOptions = options.filter(option => option.id === selected);

    return selectedOptions[0] || {};
  }

  getLongestOption() {
    return this.props.options.reduce((previous, current) => {
      if (current.label.length > previous.label.length) {
        return current;
      }

      return previous;
    });
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false, displayOpts: false, highlighted: -1 });
  }

  handleKeypress(e) {
    const { options } = this.props;
    const { disabled, displayOpts, highlighted } = this.state;
    const optsLength = options.length - 1;
    let next;

    if (e.key !== 'Tab' && e.key !== 'Shift') { e.preventDefault(); }

    if (disabled) { return; }

    if (e.key === 'Escape') {
      this.setState({ displayOpts: false, highlighted: -1 });
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (e.key === 'ArrowDown') {
        next = highlighted === optsLength ? 0 : highlighted + 1;
        if (options[next].disabled) { next++; }
      } else {
        next = highlighted < 1 ? optsLength : highlighted - 1;
        if (options[next].disabled) { next--; }
      }

      this.setState({ highlighted: next, displayOpts: true });
    }

    if (e.key === 'Enter' || e.key === ' ') {
      if (displayOpts && highlighted > -1) {
        this.selectOption(options[highlighted].id);
      } else if (e.key === ' ') { this.setState({ displayOpts: true }); }
    }
  }

  handleMouseEnter(index) {
    this.setState({ highlighted: index });
  }

  handleMouseLeave() {
    this.setState({ highlighted: -1 });
  }

  handleChange(e) {
    if (e.target.value === '') {
      this.props.onSelect('');
      return;
    }

    this.props.options.forEach((option) => {
      if (option.id === e.target.value) {
        this.selectOption(option.id);
      }
    });
  }

  handleClick() {
    if (this.props.disabled) { return; }
    this.setState({ displayOpts: !this.state.displayOpts });
  }

  handleItemClick(id, e) {
    e.stopPropagation();
    e.preventDefault();
    this.selectOption(id);
  }

  handleDisabledItemClick(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  selectOption(id) {
    this.props.onSelect(id);
    this.setState({
      displayOpts: false,
      highlighted: -1
    });
  }

  clearSelect(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSelect('');
    this.setState({
      isFocused: false
    });
  }

  render() {
    const {
      options, name, label, disabled, isValid, isRequired, isClearable, isFlexibleWidth
    } = this.props;
    const { highlighted, displayOpts, isFocused } = this.state;
    const selectedOption = this.getSelectedOption();

    const selectClasses = ['dc-select'];
    const inputClasses = ['dc-select-input'];
    const labelClasses = ['dc-form-item-label'];

    if (isFlexibleWidth) {
      selectClasses.push('dc-select-flexible-width');
    }

    if (isValid && (isRequired || selectedOption.id)) {
      inputClasses.push('dc-select-valid');
    }
    if (!isValid && selectedOption.id) {
      inputClasses.push('dc-select-invalid');
    }
    if (isFocused) {
      inputClasses.push('dc-select-focused');
    }
    if (disabled) {
      inputClasses.push('dc-select-disabled');
    }

    if (isFocused || selectedOption.label) {
      labelClasses.push('dc-form-item-label-top');
    }

    return (
      <div
        data-component="Select"
        className={selectClasses.join(' ')}
      >

        <select
          data-element="HiddenSelect"
          disabled={disabled}
          id={`select-${name}`}
          name={name}
          onChange={this.handleChange}
          style={{ display: 'none' }}
          value={selectedOption.id}
        >
          {isRequired &&
            <option value="">{this.defaultOption}</option>
          }
          {options.map((option, index) => (
            <option
              disabled={!!option.disabled}
              key={index}
              value={option.id}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div
          data-element="Select"
          className="dc-select-select"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeypress}
          onMouseDown={this.handleClick}
          onMouseLeave={this.handleMouseLeave}
          tabIndex="0"
        >
          <div className="dc-input-wrapper">
            <div data-element="Input" className={inputClasses.join(' ')}>
              <span data-element="SelectedOption" className="dc-select-selected">
                {selectedOption.label}
              </span>
              {isFlexibleWidth &&
                <span className="dc-input-fake-longest-option">
                  {this.getLongestOption().label}
                </span>
              }
            </div>
            <label className={labelClasses.join(' ')} htmlFor={`select-${name}`}>
              {' '}{label}{isRequired && '*'}{' '}
            </label>
          </div>

          <span className="dc-select-icon">
            <Icon icon={this.props.icon} />
          </span>

          {!isRequired && isClearable &&
            <span
              data-element="ClearButton"
              className={`dc-select-clear${selectedOption.id ? ' dc-select-has-selection' : ''}`}
              onMouseDown={this.clearSelect}
              title="Clear selection"
            >
              <Icon icon="Cross" />
            </span>
          }

          <ul
            data-element="List"
            className={`dc-select-list${displayOpts ? ' dc-select-list-expanded' : ''}`}
            tabIndex="-1"
          >
            {isRequired &&
              <li
                data-element="ListItem"
                className="dc-select-list-item dc-select-list-item-empty"
                key={-1}
              >
                {this.defaultOption}
              </li>
            }
            {options.map((option, index) => {
              const clickItemHandler = option.disabled
                ? (e) => { this.handleDisabledItemClick(e); }
                : (e) => { this.handleItemClick(option.id, e); };
              const mouseEnterHandler = () => { this.handleMouseEnter(index); };
              const itemClasses = ['dc-select-list-item'];

              if (option.disabled) {
                itemClasses.push('dc-select-list-disabled');
              }
              if (index === highlighted) {
                itemClasses.push('dc-select-list-highlighted');
              }

              if (selectedOption.id === option.id) {
                itemClasses.push('dc-select-list-selected');
              }

              return (
                <li
                  data-element="ListItem"
                  className={itemClasses.join(' ')}
                  key={index}
                  onMouseDown={clickItemHandler}
                  onMouseEnter={mouseEnterHandler}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    );
  }
}

Select.displayName = 'Select';

Select.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isValid: PropTypes.bool.isRequired,
  isRequired: PropTypes.bool,
  isClearable: PropTypes.bool,
  isFlexibleWidth: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.required,
    label: PropTypes.string,
    disabled: PropTypes.bool
  })),
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

Select.defaultProps = {
  disabled: false,
  icon: 'SelectArrows',
  isRequired: false,
  isClearable: false,
  isFlexibleWidth: false,
  options: [],
  selected: undefined
};

export default Select;
