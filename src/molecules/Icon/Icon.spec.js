import PropTypes from 'prop-types';
/* global describe, it, after, before */
import React, { Component } from 'react';
import { mount } from 'enzyme';
import fs from 'fs';
import path from 'path';

class getTheSvgComponent extends Component {
  constructor(...arg) {
    super(...arg);
    this.source = fs.readFileSync(path.resolve(__dirname, this.props.path), { encoding: 'UTF-8' });
  }
  render() {
    return (this.source);
  }
}

getTheSvgComponent.propTypes = {
  path: PropTypes.string.isRequired
};

let wrapper = null;

const propsToPass = {
  spin: true,
  rotate: 90,
  icon: 'Spinner'
};

const Icon = require('./Icon').default;

Icon.displayName = 'Cog';
wrapper = mount(<Icon {...propsToPass} />);

describe('Icon, Renders icon svg into document with proper properties and classes, ', () => {
  it('renders the proper svg code', () => {
    expect(wrapper.find('.dc-icon').length).toBe(1);
  });
  it('renders with the spin class setup', () => {
    expect(wrapper.find('.dc-spin').length).toBe(1);
  });
  it('renders with the rotate class setup', () => {
    expect(wrapper.find('.dc-rotate-90').length).toBe(1);
  });
});
