/* global describe, it, afterEach, beforeEach */
import React from 'react';
import { mount } from 'enzyme';

import Steps from './Steps';
import Step from '../../molecules/Step/Step';

const wrapper = mount(
  <Steps>
    {[<div className="step-test" key="foo">test step</div>]}
  </Steps>
);

const currentStepTest = mount(
  <Steps currentStep={3}>{
    new Array(5)
      .fill()
      .map((e, i) => <Step key={i} id={`step-${i + 1}`}>Step {i + 1}</Step>)
  }
  </Steps>
);

describe('Steps, ', () => {
  it('renders the container', () => {
    expect(wrapper.find('.dc-steps').length).toBeGreaterThanOrEqual(1);
  });
  it('renders the children', () => {
    expect(wrapper.find('.step-test').length).toBeGreaterThanOrEqual(1);
  });
  it('renders the completed steps with a green tick', () => {
    expect(currentStepTest.find('#step-1').props().isChecked).toBe(true);
    expect(currentStepTest.find('#step-1').props().isActive).toBe(true);
    expect(currentStepTest.find('#step-2').props().isChecked).toBe(true);
    expect(currentStepTest.find('#step-2').props().isActive).toBe(true);
  });
  it('renders the current step with a green number', () => {
    expect(currentStepTest.find('#step-3').props().isChecked).toBe(false);
    expect(currentStepTest.find('#step-3').props().isActive).toBe(true);
  });
  it('renders the following steps with a grey number', () => {
    expect(currentStepTest.find('#step-4').props().isChecked).toBe(false);
    expect(currentStepTest.find('#step-4').props().isActive).toBe(false);
    expect(currentStepTest.find('#step-5').props().isChecked).toBe(false);
    expect(currentStepTest.find('#step-5').props().isActive).toBe(false);
  });
});
