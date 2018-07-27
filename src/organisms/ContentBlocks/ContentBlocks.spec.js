import React from 'react';
import { mount } from 'enzyme';
import ContentBlocks from './ContentBlocks';

const inputData = [{
  heading: 'block1 - heading',
  body: '<h1>block1</h1> body',
  imageUrl: 'image/url/image1.jpg'
},
{
  heading: 'block2 - heading',
  body: '<h1>block2</h1> body',
  imageUrl: 'image/url/image2.jpg'
}];

const contentBlocks = mount(
  <ContentBlocks sectionHeading="section heading" blocks={inputData} />
);

describe('ContentBlocks', () => {
  it('renders correct number of ContentBlock children', () => {
    expect(contentBlocks.find('ContentBlock').length)
      .toBe(inputData.length);
  });
});
