import path from 'path';
import React from 'react';
import { mount } from 'enzyme';
import ContentBlock from './ContentBlock';

const inputData = { heading: 'Block heading', body: 'Block body', imageUrl: 'http://imageURL/imageFileName.ext' };

const contentBlock = mount(
  <ContentBlock content={inputData} />
);

describe('ContentBlock', () => {
  it('generates correct image tag', () => {
    expect(contentBlock.find('.dc-content-block__image img').html())
      .toBe(`<img alt="${path.basename(inputData.imageUrl)}" src="${inputData.imageUrl}">`);
  });
  it('renders correct heading', () => {
    expect(contentBlock.find('h3').text())
      .toBe(inputData.heading);
  });
  it('renders correct body', () => {
    expect(contentBlock.find('.dc-content-block__body').text())
      .toBe(inputData.body);
  });
});
