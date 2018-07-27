import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ContentBlock from '../../molecules/ContentBlock/ContentBlock.js';
import Box from '../../molecules/Box/Box.js';
import './ContentBlocks.styl';

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('flexibility');
}

class ContentBlocks extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sectionHeading: props.sectionHeading,
      blocks: props.blocks
    };

    this.renderContentBlock = this.renderContentBlock.bind(this);
  }

  renderContentBlock(item, index) {
    return (
      <li className="dc-content-block__wrapper" key={index}>
        <ContentBlock content={item} />
      </li>
    );
  }

  render() {
    return (
      <div data-component="ContentBlocks" className="dc-content-blocks__wrapper">
        <Box>{this.props.sectionHeading}</Box>
        <ul className="dc-base-font dc-content-blocks">
          {this.props.blocks.map(this.renderContentBlock)}
        </ul>
      </div>
    );
  }
}

ContentBlocks.propTypes = {
  sectionHeading: PropTypes.string.isRequired,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ContentBlocks;
