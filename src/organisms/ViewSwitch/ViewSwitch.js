import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../molecules/Button/Button';
import './ViewSwitch.styl';

const cookies = require('cookies-js');

class ViewSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.newView = this.props.view === 'list' ? 'grid' : 'list';
    this.cookieName = 'layout';
  }

  getCurrentDomain() {
    return window.location.host;
  }

  getCurrentPath() {
    return window.location.pathname;
  }

  getSegmentUrl() {
    const url = this.getCurrentPath();
    const regExpPagination = /^(.*)(\/[0-9]+_[0-9]+\/)/g;
    const regExpNoPagination = /^(.*)(\/[^/]+-criteria\.html)$/g;
    let urlMatches = regExpPagination.exec(url);
    if (urlMatches === null) {
      urlMatches = regExpNoPagination.exec(url);
    }
    return urlMatches !== null && urlMatches[1] !== undefined ? urlMatches[1] : '/';
  }

  handleClick(event) {
    const optionsDelete = {
      domain: this.getCurrentDomain(),
      path: this.getSegmentUrl()
    };
    const optionsAdd = {
      domain: this.getCurrentDomain()
    };
    if (event) {
      event.preventDefault();
    }
    /*
    * We need Cookie.expire for users who have old cookies set with path.
    * It can be removed later.
    */
    cookies.expire(this.cookieName, optionsDelete);
    cookies.set(this.cookieName, this.newView, optionsAdd);
    window.location.reload();
  }

  render() {
    const { props } = this;

    return (
      <div className="dc-view-switch">
        <span className="dc-view-switch-label">{props.title}</span>
        <Button
          classes="dc-view-switch-button"
          type="button"
          style="none"
          onClick={this.handleClick}
          disabled={props.view === 'grid'}
          icon="GridView"
        >
          {props.gridButtonLabel}
        </Button>
        <Button
          classes="dc-view-switch-button"
          type="button"
          style="none"
          onClick={this.handleClick}
          disabled={props.view === 'list'}
          icon="ListView"
        >
          {props.listButtonLabel}
        </Button>
      </div>
    );
  }
}

ViewSwitch.displayName = 'ViewSwitch';

ViewSwitch.propTypes = {
  view: PropTypes.string,
  title: PropTypes.string,
  gridButtonLabel: PropTypes.string,
  listButtonLabel: PropTypes.string
};

ViewSwitch.defaultProps = {
  view: 'grid',
  title: 'View:',
  gridButtonLabel: 'Grid',
  listButtonLabel: 'List'
};

export default ViewSwitch;

