import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import { H3 } from '../../molecules/Heading/Heading.js';
import './ContentBlock.styl';

function ContentBlock(props) {

  const { content } = props;

  const productImage = props.content.imageUrl
    ? <img alt={path.basename(props.content.imageUrl)} src={props.content.imageUrl} />
    : null;

  return (
    <div data-component="ContentBlock" className="dc-content-block">
      <div className="dc-content-block__image">
        {productImage}
      </div>
      <div className="dc-content-block__block">
        <H3 classes="dc-content-block__header">{content.heading}</H3>
        <div className="dc-content-block__divider" />
        <div
          className="dc-text dc-content-block__body"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </div>
    </div>
  );
}

ContentBlock.propTypes = {
  content: PropTypes.shape({
    heading: PropTypes.string,
    body: PropTypes.string,
    imageUrl: PropTypes.string
  }).isRequired
};

export default ContentBlock;
