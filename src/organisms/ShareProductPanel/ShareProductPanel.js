import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ShareProductPanel.styl';
import ShareLink from '../ShareLink/ShareLink';
import Icon from '../../molecules/Icon/Icon';

class ShareProductPanel extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.open
    };

    this.togglePanel = this.togglePanel.bind(this);
    this.showPanel = this.showPanel.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.autoHidePanel = this.autoHidePanel.bind(this);
  }

  autoHidePanel(e) {
    if (
      e.target !== this.panelContainer &&
      !this.panelContainer.contains(e.target)
    ) {
      this.hidePanel(e);
    }
  }

  /**
   * @public
   * @param {Event} e
   */
  showPanel(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      isOpen: true
    }, () => {
      if (window === 'undefined') return;
      document.addEventListener('click', this.autoHidePanel);
      this.props.onOpen();
    });
  }

  /**
   * @public
   * @param {Event} e
   */
  hidePanel(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      isOpen: false
    }, () => {
      if (window === 'undefined') return;
      document.removeEventListener('click', this.autoHidePanel);
      this.props.onClose();
    });
  }

  /**
   * @public
   * @param {Event} e
   */
  togglePanel(e) {
    if (this.state.isOpen) {
      this.hidePanel(e);
    } else {
      this.showPanel(e);
    }
  }

  render() {
    const {
      props: {
        enableAnalytics,
        product,
        viewport,
        title,
        closeText
      }, state: {
        isOpen
      }
    } = this;

    const classNames = [
      'dc-share-product-panel-container',
      `dc-share-product-panel-container--${isOpen ? 'open' : 'closed'}`,
      `dc-share-product-panel-container--${viewport === 'desktop' ? 'desktop' : 'mobile'}`
    ];

    let panelEventHandlers;

    if (viewport === 'desktop') {
      panelEventHandlers = {
        onMouseLeave: this.hidePanel
      };
    }

    const toggleLink = (
      <a
        data-component="ShareProductPanel"
        className="dc-share-product-panel-container__toggle-link dc-link"
        href=""
        onClick={this.hidePanel}
      >
        {viewport === 'mobile' && closeText}
        <Icon
          icon={viewport === 'mobile' ? 'ChevronRight' : 'Share'}
          rotate={viewport === 'mobile' ? 90 : 0}
        />
      </a>
    );

    return (
      <div
        className={classNames.join(' ')}
        ref={(panelContainer) => { this.panelContainer = panelContainer; }}
        {...panelEventHandlers}
      >
        <div className="dc-share-product-panel-container__header">
          <strong className="dc-share-product-panel-container__header__title">
            {title}
          </strong>
          {viewport === 'mobile' && toggleLink}
        </div>
        <div className="dc-share-product-panel-container__links">
          {(product.shareLinks || []).map(shareLink => (
            <ShareLink
              enableAnalytics={enableAnalytics}
              key={`share-link-${shareLink.name}`}
              service={shareLink.name}
              shareUrl={shareLink.url}
            />
          ))}
        </div>
      </div>
    );
  }
}

ShareProductPanel.displayName = 'ShareProductPanel';

ShareProductPanel.propTypes = {

  /**
   * This prop will be passed to ShareLink component.
   */
  enableAnalytics: PropTypes.bool,

  /**
   * Should panel be opened by default?
   */
  open: PropTypes.bool,

  /**
   * Callback called when panel is being closed.
   */
  onClose: PropTypes.func,

  /**
   * Callback called when panel is being opened.
   */
  onOpen: PropTypes.func,

  /**
   * Product to share
   */
  product: PropTypes.shape({
    shareLinks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string
    }))
  }).isRequired,

  /**
   * Panel title
   */
  title: PropTypes.string,

  /**
   * Content of the toggle link when panel is open and `staticToggle` is `false`.
   */
  closeText: PropTypes.string,

  /**
   * Current viewport
   */
  viewport: PropTypes.string.isRequired
};

ShareProductPanel.defaultProps = {
  enableAnalytics: false,
  open: false,
  title: 'Share this item',
  closeText: 'Hide',
  onOpen: () => {},
  onClose: () => {}
};

export default ShareProductPanel;
