import React from 'react';
import { mount } from 'enzyme';
import Paginator from './Paginator';

let wrapper;

function defaultPropsGenerator(activePageIndex, onLinkClickHandler = () => {}) {
  const defaultProps = {
    pagesList: [
      {
        url: 'https://www.currys.co.uk/',
        label: 1,
        isCurrent: false
      },
      {
        url: 'https://www.currys.co.uk/',
        label: 2,
        isCurrent: false
      },
      {
        url: 'https://www.currys.co.uk/',
        label: 3,
        isCurrent: false
      },
      {
        url: 'https://www.currys.co.uk/',
        label: 4,
        isCurrent: false
      },
      {
        url: 'https://www.currys.co.uk/',
        label: 5,
        isCurrent: false
      }
    ],
    onLinkClick: onLinkClickHandler
  };

  defaultProps.pagesList[activePageIndex - 1].isCurrent = true;
  return defaultProps;
}

const setup = (props = defaultPropsGenerator(1)) => mount(
  <Paginator {...props} />
);

describe('Paginator', () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }

    jest.restoreAllMocks();
  });

  it('has displayName property set', () => {
    expect(Paginator.displayName).toBe('Paginator');
  });

  it('renders correct count of anchors (2 more because of additional left and right arrow)', () => {
    wrapper = setup(defaultPropsGenerator(2));
    expect(wrapper.find('.dc-pagination li').length).toBe(
      defaultPropsGenerator(2).pagesList.length + 2
    );
  });

  describe('Proper arrow rendering', () => {
    it('render first list item with left arrow character (first page is not active)', () => {
      wrapper = setup(defaultPropsGenerator(2));
      expect(wrapper.find('.dc-pagination li').first().text()).toBe(
        '←'
      );
    });
    it('render last list item with right arrow character (last page is not active)', () => {
      wrapper = setup(defaultPropsGenerator(2));
      expect(wrapper.find('.dc-pagination li').last().text()).toBe(
        '→'
      );
    });
    it('does not render first list item as arrow when first paginator item is active', () => {
      wrapper = setup(defaultPropsGenerator(1));
      expect(wrapper.find('.dc-pagination li').first().text()).toBe(
        '1'
      );
    });
    it('does not render last list item as arrow when last paginator item is active', () => {
      wrapper = setup(defaultPropsGenerator(5));
      expect(wrapper.find('.dc-pagination li').last().text()).toBe(
        '5'
      );
    });
  });

  it('calls onClick handler after clicking on anchor', () => {
    const clickSpy = jest.fn();
    wrapper = setup(defaultPropsGenerator(5, clickSpy));
    wrapper.find('.dc-pagination li a').first().simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
