import React from 'react';
import { shallow, mount } from 'enzyme';

import StayInTouchBlock from './StayInTouchBlock';

describe('StayInTouchBlock', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallow(<StayInTouchBlock />);

    expect(wrapper).toMatchSnapshot();
  });

  it('group is inactive by default', () => {
    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('group is active by default when at least one item is active', () => {
    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          items: [
            {
              name: 'email',
              label: 'Email',
              isChecked: true
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('group gets inactive when last item is unchecked', () => {
    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          items: [
            {
              name: 'email',
              label: 'Email',
              isChecked: true
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
    />);

    wrapper.find('Checkbox[name="email"]').simulate('check');

    expect(wrapper).toMatchSnapshot();
  });

  it('no item is checked when group has multiple items and became active', () => {
    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
    />);

    wrapper.find('OnOffSwitch[name="groupName"]').simulate('switch');

    expect(wrapper).toMatchSnapshot();
  });

  it('single item gets checked when group is activated', () => {
    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          items: [
            {
              name: 'email',
              label: 'Email'
            }
          ]
        }
      ]}
    />);

    wrapper.find('OnOffSwitch[name="groupName"]').simulate('switch');

    expect(wrapper).toMatchSnapshot();
  });

  it('all items gets unchecked when group is deactivated', () => {
    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          items: [
            {
              name: 'email',
              label: 'Email',
              isChecked: true
            },
            {
              name: 'phone',
              label: 'Phone',
              isChecked: true
            },
            {
              name: 'text',
              label: 'Text'
            }
          ]
        }
      ]}
    />);

    wrapper.find('OnOffSwitch[name="groupName"]').simulate('switch');

    expect(wrapper).toMatchSnapshot();
  });

  it('correctly renders validation errors', () => {
    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          hasValidationError: true,
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
    />);

    wrapper.find('OnOffSwitch[name="groupName"]').simulate('switch');

    expect(wrapper).toMatchSnapshot();
  });

  it('correctly renders popup icon', () => {
    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          providesPopup: true,
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('calls popup renderer on popup icon click', () => {
    let closePopupCallback;

    const popupRenderer = jest.fn((popupName, closePopup) => {
      closePopupCallback = closePopup;
    });

    const wrapper = mount(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          providesPopup: true,
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
      popupRenderer={popupRenderer}
    />);

    wrapper.find('a[href="#more-info"]').simulate('click');

    expect(popupRenderer.mock.calls.length).toBe(1);
    expect(popupRenderer.mock.calls[0][0]).toBe('groupName');

    closePopupCallback();

    expect(wrapper.state('activePopup')).toBeNull();
  });

  it('calls checkbox callback and state is changed', () => {
    const onCheckboxChanged = jest.fn();

    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          providesPopup: true,
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
      onCheckboxChanged={onCheckboxChanged}
    />);

    wrapper.find('OnOffSwitch[name="groupName"]').simulate('switch');
    wrapper.find('Checkbox[name="email"]').simulate('check');

    expect(onCheckboxChanged.mock.calls.length).toBe(1);
    expect(onCheckboxChanged.mock.calls[0][0]).toMatchObject([
      {
        name: 'email',
        isChecked: true
      }
    ]);

    expect(wrapper.state('groups')).toMatchObject({
      groupName: {
        isToggleActive: true,
        items: [
          {
            name: 'email',
            isChecked: true
          },
          {
            name: 'phone',
            isChecked: false
          }
        ]
      }
    });
  });

  it('reverts to previous state when error is thrown from callback (multiple items)', async () => {
    const onCheckboxChanged = jest.fn(() => Promise.reject(new Error('Error happened.')));

    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          providesPopup: true,
          items: [
            {
              name: 'email',
              label: 'Email'
            },
            {
              name: 'phone',
              label: 'Phone'
            }
          ]
        }
      ]}
      onCheckboxChanged={onCheckboxChanged}
    />);

    wrapper.find('OnOffSwitch[name="groupName"]').simulate('switch');
    await wrapper.find('Checkbox[name="email"]').simulate('check');

    expect(onCheckboxChanged.mock.calls.length).toBe(1);
    expect(onCheckboxChanged.mock.calls[0][0]).toMatchObject([
      {
        name: 'email',
        isChecked: true
      }
    ]);

    expect(wrapper.state('groups')).toMatchObject({
      groupName: {
        isToggleActive: true,
        errorMessage: new Error('Error happened.'),
        items: [
          {
            name: 'email',
            isChecked: false
          },
          {
            name: 'phone',
            isChecked: false
          }
        ]
      }
    });
  });

  it('reverts to previous state when error is thrown from callback (single item)', async () => {
    const onCheckboxChanged = jest.fn(() => Promise.reject(new Error('Error happened.')));

    const wrapper = shallow(<StayInTouchBlock
      contactChannelGroups={[
        {
          name: 'groupName',
          description: 'Some description',
          toggleDescription: 'Some toggle description',
          providesPopup: true,
          items: [
            {
              name: 'email',
              label: 'Email'
            }
          ]
        }
      ]}
      onCheckboxChanged={onCheckboxChanged}
    />);

    await wrapper.find('OnOffSwitch[name="groupName"]').simulate('switch');

    expect(onCheckboxChanged.mock.calls.length).toBe(1);
    expect(onCheckboxChanged.mock.calls[0][0]).toMatchObject([
      {
        name: 'email',
        isChecked: true
      }
    ]);

    expect(wrapper.state('groups')).toMatchObject({
      groupName: {
        isToggleActive: false,
        errorMessage: new Error('Error happened.'),
        items: [
          {
            name: 'email',
            isChecked: false
          }
        ]
      }
    });
  });
});
