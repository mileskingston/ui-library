import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from '../../molecules/Tab/Tab';
import TabPanel from '../../molecules/TabPanel/TabPanel';

import './Tabs.styl';

class Tabs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.active
    };

    this.renderPanel = this.renderPanel.bind(this);
    this.renderTabList = this.renderTabList.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(index, e) {
    e.preventDefault();
    this.setState({
      activeTab: index
    });

    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  renderTabList() {
    if (!this.props.children) {
      throw new Error('Tabs must contain at least one TabPanel');
    }

    if (!Array.isArray(this.props.children)) {
      this.props.children = [this.props.children];
    }

    const tabsCount = this.props.children.length;
    const tabs = this.props.children
      .map((panel, index) => {
        const tabClickHandler = this.setActiveTab.bind(this, index);

        return (
          <Tab
            key={index}
            tabId={index}
            label={panel.props.label || panel.props.title}
            active={this.state.activeTab === index}
            tabClickHandler={tabClickHandler} // eslint-disable-line react/jsx-no-bind
          />
        );
      });

    return (
      <ul data-element="TabList" className={`dc-tab-list dc-tab-list-${tabsCount}`}>
        {tabs}
      </ul>
    );
  }

  renderPanel() {
    return (
      <TabPanel>
        {this.props.children[this.state.activeTab]}
      </TabPanel>
    );
  }

  render() {
    return (
      <div data-component="Tabs" className="dc-tabs">
        {this.renderTabList()}
        {this.renderPanel()}
      </div>
    );
  }
}

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
  active: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
};

Tabs.defaultProps = {
  active: 0,
  onChange: undefined
};

export default Tabs;
