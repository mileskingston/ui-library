import PropTypes from 'prop-types';
import React from 'react';

import './ItemsPerPage.styl';

function ItemsPerPage(props) {

  const {
    itemsCount,
    options,
    activeOption,
    onOptionSelected,
    showLabelStart,
    showLabelEnd,
    showLabelEndMobile,
    allLinkLabel
  } = props;

  function renderItem(option, label, renderSeparator = true) {
    if (option === activeOption) {
      return (
        <span key={option}>
          {renderSeparator ? <span> | </span> : ' '}
          {label}
        </span>
      );
    }

    return (
      <span key={option}>
        {renderSeparator ? <span> | </span> : ' '}
        <a
          className="dc-link"
          key={option}
          href={`#${label}`}
          onClick={(e) => {
            e.preventDefault();
            onOptionSelected(option);
          }}
        >{label}
        </a>
      </span>
    );
  }

  if (itemsCount <= options[0]) {
    return <noscript />;
  }

  const displayedOptions = options.filter(option => option < itemsCount);

  return (
    <div className="dc-items-per-page">
      {`${showLabelStart} `}
      {displayedOptions.map((option, index) => renderItem(
        option,
        option,
        index > 0
      ))}
      {options.length > displayedOptions.length &&
        renderItem(itemsCount, allLinkLabel)}
      <span className="items-per-page-mobile"> {showLabelEndMobile}</span>
      <span className="items-per-page-desktop"> {showLabelEnd}</span>
    </div>
  );

}

ItemsPerPage.displayName = 'ItemsPerPage';

ItemsPerPage.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  activeOption: PropTypes.number.isRequired,
  onOptionSelected: PropTypes.func,
  showLabelStart: PropTypes.string,
  showLabelEnd: PropTypes.string,
  showLabelEndMobile: PropTypes.string,
  allLinkLabel: PropTypes.string
};

ItemsPerPage.defaultProps = {
  onOptionSelected: () => {},
  showLabelStart: 'Show',
  showLabelEnd: 'items per page',
  showLabelEndMobile: 'items',
  allLinkLabel: 'All'
};

export default ItemsPerPage;
