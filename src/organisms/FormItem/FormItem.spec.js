import React from 'react';
import { mount } from 'enzyme';
import FormSimple from '../FormSimple/FormSimple';
import FormItem from './FormItem';

function initializeFormItem(propsToFormItem) {
  return mount(
    <FormSimple>
      <FormItem {...propsToFormItem} />);
    </FormSimple>
  );
}

describe('FormItem initialization', () => {
  describe('Renders the inputs properly', () => {
    describe('Inputs of a type text, password, email and hidden have the proper format', () => {
      ['text', 'password', 'email', 'hidden'].forEach((item) => {
        // eslint-disable-next-line max-len
        const wrapper = initializeFormItem({ name: 'test', type: item, hint: 'test hint' });
        expect(wrapper.find('Input').length).toBe(1);
        expect(wrapper.find('.dc-input-hint').length).toBe(1);
      });
      it('Item of type select has the proper format', () => {
        // eslint-disable-next-line max-len
        const wrapper = initializeFormItem({ name: 'test', type: 'select', hint: 'test hint' });
        expect(wrapper.find('Select').length).toBe(1);
        expect(wrapper.find('.dc-input-hint').length).toBe(1);
      });
    });
  });
});

describe('FormItem validation', () => {
  describe('FormItem input type text validation', () => {
    it('FormItem input type text maxLength validation', () => {
      const wrapper = initializeFormItem({
        name: 'test',
        type: 'text',
        hint: 'testing hint',
        maxLength: 5,
        errorMessage: 'test error message'
      });
      wrapper.find('FormItem').instance().updateValue('too long text is here to test');
      wrapper.update();
      expect(wrapper.find('.dc-text-error').length).toBe(1);
    });
    it('FormItem input type text minLength validation', () => {
      const wrapper = initializeFormItem({
        name: 'test',
        type: 'text',
        hint: 'testing hint',
        minLength: 20,
        errorMessage: 'test error message'
      });
      wrapper.find('FormItem').instance().updateValue('short');
      wrapper.update();
      expect(wrapper.find('.dc-text-error').length).toBe(1);
    });
    describe('FormItem input type text allowedChars validation', () => {
      it('numeric test', () => {
        const wrapper = initializeFormItem({
          name: 'test',
          type: 'text',
          hint: 'testing hint',
          allowedChars: 'numeric',
          errorMessage: 'test error message'
        });
        wrapper.find('FormItem').instance().updateValue('not allowed here');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(1);

        wrapper.find('FormItem').instance().updateValue('125');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(0);
      });
      it('alphanumeric test', () => {
        const wrapper = initializeFormItem({
          name: 'test',
          type: 'text',
          hint: 'testing hint',
          allowedChars: 'alphanumeric',
          errorMessage: 'test error message'
        });

        wrapper.find('FormItem').instance().updateValue('****');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(1);

        wrapper.find('FormItem').instance().updateValue('5FGT5');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(0);
      });
      it('specialalphanumeric test', () => {
        const wrapper = initializeFormItem({
          name: 'test',
          type: 'text',
          hint: 'testing hint',
          allowedChars: 'specialalphanumeric',
          errorMessage: 'test error message'
        });

        wrapper.find('FormItem').instance().updateValue('\x00');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(1);

        wrapper.find('FormItem').instance().updateValue('\x3F');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(0);
      });
      it('alpha test', () => {
        const wrapper = initializeFormItem({
          name: 'test',
          type: 'text',
          hint: 'testing hint',
          allowedChars: 'alpha',
          errorMessage: 'test error message'
        });

        wrapper.find('FormItem').instance().updateValue('15');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(1);

        wrapper.find('FormItem').instance().updateValue('test');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(0);
      });
    });
  });
  describe('Password, email and hidden input validations', () => {
    ['password', 'email', 'hidden'].forEach((type) => {
      describe(`${type} validation`, () => {
        it('maxlength validation', () => {
          const wrapper = initializeFormItem(
            { name: 'test', maxLength: 5, errorMessage: 'test error message' }
          );
          wrapper.find('FormItem').instance().updateValue('too long text is here to test');
          wrapper.update();
          expect(wrapper.find('.dc-text-error').length).toBe(1);
        });
        it('minLength validation', () => {
          const wrapper = initializeFormItem(
            { name: 'test', minLength: 20, errorMessage: 'test error message' }
          );
          wrapper.find('FormItem').instance().updateValue('short');
          wrapper.update();
          expect(wrapper.find('.dc-text-error').length).toBe(1);
        });

        function intializeInput(allowedChars) {
          return initializeFormItem({
            name: 'test',
            type: 'text',
            allowedChars: allowedChars,
            errorMessage: 'test error message'
          });
        }

        describe('allowedChars validation', () => {
          [{
            type: 'numeric',
            toerror: 'test',
            withouterror: '1563'
          },
          {
            type: 'alphanumeric',
            toerror: '*****',
            withouterror: '15fda5'
          },
          {
            type: 'specialalphanumeric',
            toerror: '\x00',
            withouterror: '\x3F'
          },
          {
            type: 'alpha',
            toerror: '5555',
            withouterror: 'alpha'
          }
          ].forEach((setup) => {
            it(`${setup.type}`, () => {
              const wrapper = intializeInput(setup.type);
              wrapper.find('FormItem').instance().updateValue(setup.toerror);
              wrapper.update();
              expect(wrapper.find('.dc-text-error').length).toBe(1);

              wrapper.find('FormItem').instance().updateValue(setup.withouterror);
              wrapper.update();
              expect(wrapper.find('.dc-text-error').length).toBe(0);
            });
          });
        });
      });
    });
  });
});
describe('FormItem mustMatch,', () => {
  function initializeInput(setup01, setup02) {
    // eslint-disable-next-line max-len
    return mount(
      <FormSimple>
        <FormItem {...setup01} />
        <FormItem {...setup02} />
      </FormSimple>
    );
  }
  ['text', 'password', 'email', 'hidden'].forEach((item) => {
    describe(`${item}`, () => {
      // eslint-disable-next-line max-len
      const wrapper = initializeInput(
        {
          name: 'test01', type: item, mustMatch: 'test02', errorMessage: 'Does not match'
        },
        {
          name: 'test02', type: item, mustBeMatchedBy: 'test01', errorMessage: 'Does not match'
        }
      );
      it('not matching', () => {
        wrapper.find('FormItem').at(0).instance().updateValue('notmatching@dixonscarphone.com');
        wrapper.find('FormItem').at(1).instance().updateValue('notmatching01@dixonscarphone.com');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(1);
      });
      it('matching', () => {
        wrapper.find('FormItem').at(0).instance().updateValue('matching@dixonscarphone.com');
        wrapper.find('FormItem').at(1).instance().updateValue('matching@dixonscarphone.com');
        wrapper.update();
        expect(wrapper.find('.dc-text-error').length).toBe(0);
      });
    });
  });
});
describe('Password show strength generates the strength indicator,', () => {
  it('Shows the strength indicatior', () => {
    const setup01 = { name: 'test01', type: 'password', showStrength: true };
    // eslint-disable-next-line max-len
    const wrapper = mount(
      <FormSimple>
        <FormItem {...setup01} />
      </FormSimple>
    );
    expect(wrapper.find('PasswordStrengthIndicator').length).toBe(1);
  });
});
