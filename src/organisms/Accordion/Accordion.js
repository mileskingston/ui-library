import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccordionPanel from '../../molecules/AccordionPanel/AccordionPanel';
import './Accordion.styl';

class Accordion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activePanel: props.active
    };

    this.setActivePanel = this.setActivePanel.bind(this);
    this.renderPanels = this.renderPanels.bind(this);
  }

  setActivePanel(index, e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      activePanel: index === this.state.activePanel ? -1 : index
    });

    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  renderPanels() {
    let Panels = this.props.children;
    const { state: { activePanel }, props: { scrollOffset } } = this;

    if (!Panels) {
      throw new Error('Accordion must have at least one Panel');
    }

    if (!Array.isArray(Panels)) { Panels = [Panels]; }

    return Panels.map((panel, index) => {
      const { title, children } = panel.props;
      const onClick = this.setActivePanel.bind(this, index);

      return (
        <AccordionPanel
          title={title}
          key={index}
          panelId={index}
          active={activePanel === index}
          onClick={onClick} // eslint-disable-line react/jsx-no-bind
          scrollOffset={scrollOffset}
        >
          {children}
        </AccordionPanel>
      );
    });
  }

  render() {
    return (
      <div data-component="Accordion" className="dc-accordion">
        {this.renderPanels()}
      </div>
    );
  }
}

Accordion.displayName = 'Accordion';

Accordion.propTypes = {
  onChange: PropTypes.func,
  scrollOffset: PropTypes.number,
  active: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
};

Accordion.defaultProps = {
  active: 0,
  scrollOffset: 0,
  onChange: () => {}
};

export default Accordion;
