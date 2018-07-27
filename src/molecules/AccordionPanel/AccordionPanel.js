/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

class AccordionPanel extends Component {

  componentDidMount() {
    const { props } = this;

    if (props.active) {
      setTimeout(() => {
        this.scrollToSelf();
      }, 10);
    }
  }

  scrollToSelf() {
    if (window === 'undefined') return;
    const { props: { active, scrollOffset } } = this;

    if (active && this.domNode !== null) {
      const elementTop = this.domNode.getBoundingClientRect().top;
      const documentTop = document.documentElement.scrollTop;
      const scrollFromTop = (elementTop + documentTop) - scrollOffset;

      window.scrollTo(0, scrollFromTop);
    }
  }

  render() {
    const {
      title, children, onClick, active, panelId
    } = this.props;

    return (
      <div
        data-component="AccordionPanel"
        data-id={panelId}
        ref={(domNode) => { this.domNode = domNode; }}
        className={`dc-accordion-panel${active ? ' dc-accordion-panel-active' : ''}`}
      >
        <div onClick={onClick} data-element="Bar" className="dc-accordion-bar dc-clr-primary">
          <div className="dc-accordion-line dc-background-primary" />
          <span data-element="Icon" className="dc-accordion-bar-icon">
            <Icon icon="ChevronRight" />
          </span>
          <span className="dc-accordion-title">{title}</span>
        </div>

        {active &&
          <div data-element="Content" className="dc-accordion-content">
            <div data-element="ContentWrapper" className="dc-accordion-content-wrapper">
              {children}
            </div>
          </div>
        }
      </div>
    );
  }
}

AccordionPanel.displayName = 'AccordionPanel';

AccordionPanel.propTypes = {
  panelId: PropTypes.number.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  scrollOffset: PropTypes.number.isRequired
};

AccordionPanel.defaultProps = {
  active: false,
  onClick: () => {}
};

export default AccordionPanel;
