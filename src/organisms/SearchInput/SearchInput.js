import PropTypes from 'prop-types';
import React from 'react';
import Close from '../Close/Close';
import Icon from '../../molecules/Icon/Icon';
import './SearchInput.styl';

const resetTimeout = (timeout = undefined) =>
  (state) => {
    if (state.timeoutId) {
      clearTimeout(state.timeoutId);
    }

    return {
      timeoutId: timeout
    };
  };

const clearSearch = inputEl =>
  (state, props) => {
    let { isFocused } = state;
    if (props.focusAfterClear) {
      inputEl.focus();
      isFocused = true;
    }

    props.onClear();

    return {
      clearSearch: false,
      isFocused: isFocused
    };
  };

/**
 * @deprecated this component will be removed in version 4.0.0
 */
class SearchInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFocused: props.autoFocus || false
    };

    this.onClear = this.onClear.bind(this);
    this.toggleFocusOn = this.toggleFocusOn.bind(this);
    this.toggleFocusOff = this.toggleFocusOff.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.timeoutId) {
      this.setState(resetTimeout());
    }

    return !nextState.timeoutId;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onClear() {
    if (this.mounted) {
      if (this.state.isFocused) {
        this.setState({ clearSearch: true });
      } else {
        this.setState(clearSearch(this.inputRef));
      }
    }
  }

  toggleFocusOn() {
    if (this.mounted) {
      this.setState({ isFocused: true, clearSearch: false });
      this.props.onFocus();
    }
  }

  toggleFocusOff() {
    if (this.mounted) {
      const timeoutId = setTimeout(() => {
        if (this.mounted) {
          this.setState(resetTimeout(timeoutId));

          if (this.state.clearSearch) {
            this.setState(clearSearch(this.inputRef));
          } else {
            this.setState({
              isFocused: false
            });

            this.props.onBlur();
          }
        }
      }, 200);
    }
  }

  render() {
    const { props, state } = this;

    const wrapperClasses = ['dc-search-input-wrapper'];
    const inputClasses = ['dc-search-input', 'nostyle'];
    const labelClasses = ['dc-form-item-label'];

    if (props.value === '') {
      wrapperClasses.push('dc-search-input-wrapper-empty');
    }
    if (props.isValid && props.value !== '') {
      inputClasses.push('dc-search-input-valid');
    }
    if (!props.isValid && props.value !== '') {
      inputClasses.push('dc-search-input-invalid');
    }
    if (props.disabled) {
      inputClasses.push('dc-search-input-disabled');
    }
    if (state.isFocused) {
      inputClasses.push('dc-search-input-focused');
    }
    if (props.icon) {
      inputClasses.push('dc-search-input-icon-right');
    }
    if (state.isFocused || props.value !== '') {
      labelClasses.push('dc-form-item-label-top');
    }
    return (
      <span data-component="SearchInput" className={wrapperClasses.join(' ')}>
        <input
          aria-invalid={props.isValid}
          aria-label={props.label}
          autoFocus={props.autoFocus}
          autoComplete="off"
          autoCorrect="off"
          className={inputClasses.join(' ')}
          data-element="Input"
          id={`search-input-${props.name}`}
          name={props.name}
          onBlur={this.toggleFocusOff}
          onChange={props.onChange}
          onFocus={this.toggleFocusOn}
          onKeyDown={props.onKeyDown}
          placeholder={props.placeholder}
          required
          ref={(el) => {
            this.inputRef = el;
            if (props.inputRef) {
              props.inputRef(el);
            }
          }}
          spellCheck="false"
          tabIndex={props.tabIndex}
          type="search"
          value={props.value}
        />

        {props.value && !props.processing &&
          <span className="dc-search-input-clear">
            <Close onClose={this.onClear} />
          </span>
        }

        {!props.processing &&
          <span className="dc-search-input-icon" onClick={props.onSearch}>
            <Icon icon={props.icon} />
          </span>
        }

        {props.processing &&
          <span className="dc-search-input-processing">
            <Icon icon="Spinner" spin />
          </span>
        }

        {props.label &&
        <label htmlFor={`input-${props.name}`} className={labelClasses.join(' ')}>
          {props.label}{props.isRequired && '*'}
        </label>
        }
      </span>
    );
  }
}

SearchInput.propTypes = {
  autoFocus: PropTypes.bool,
  focusAfterClear: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  inputRef: PropTypes.func,
  isValid: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  processing: PropTypes.bool,
  tabIndex: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

SearchInput.defaultProps = {
  autoFocus: false,
  inputRef: null,
  focusAfterClear: false,
  disabled: false,
  icon: 'Search',
  isValid: undefined,
  label: '',
  name: 'searchterm',
  onClear: () => {},
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onSearch: () => {},
  placeholder: '',
  processing: false,
  tabIndex: undefined,
  value: ''
};

export default SearchInput;
