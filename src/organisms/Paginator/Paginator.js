import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Paginator.styl';

class Paginator extends PureComponent {
  constructor(props) {
    super(props);
    this.renderPageLink = this.renderPageLink.bind(this);
  }

  onLinkClick(e, page) {
    e.preventDefault();
    this.props.onLinkClick(page.url, page.label);
  }

  getCurrentPageIndex() {
    return this.props.pagesList.findIndex(page =>
      page.isCurrent === true);
  }

  createAnchor(page) {
    const { url, anchorLabel, isCurrent } = page;
    if (isCurrent) {
      return (
        <a className="dc-pagination__item--current">
          <strong>{anchorLabel}</strong>
        </a>
      );
    }
    return <a onClick={e => this.onLinkClick(e, page)} href={url}>{anchorLabel}</a>;
  }

  renderArrowLeft() {
    const previousPage = this.props.pagesList[this.getCurrentPageIndex() - 1];

    if (previousPage) {
      return (
        <li key="previous" className="dc-pagination__item">
          {this.createAnchor({ ...previousPage, anchorLabel: '←' })}
        </li>
      );
    }
    return null;
  }

  renderArrowRight() {
    const nextPage = this.props.pagesList[this.getCurrentPageIndex() + 1];

    if (nextPage) {
      return (
        <li key="next" className="dc-pagination__item">
          {this.createAnchor({ ...nextPage, anchorLabel: '→' })}
        </li>
      );
    }
    return null;
  }

  renderPageLink(page) {
    return (
      <li key={page.label} className="dc-pagination__item">
        {this.createAnchor({ ...page, anchorLabel: page.label })}
      </li>
    );
  }

  render() {
    return (
      <ul className="dc-pagination">
        {this.renderArrowLeft()}
        {this.props.pagesList.map(this.renderPageLink)}
        {this.renderArrowRight()}
      </ul>
    );
  }
}

Paginator.displayName = 'Paginator';

Paginator.propTypes = {
  pagesList: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.number,
    isCurrent: PropTypes.bool
  })),
  onLinkClick: PropTypes.func
};

Paginator.defaultProps = {
  pagesList: [],
  onLinkClick: () => {}
};

export default Paginator;
