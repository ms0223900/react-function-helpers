import React from 'react';
import { mount } from 'enzyme';
import { singleSelectorOption } from './__mocks/common-mocks';
import { TestHookWrapper } from '../../../../lib/TestHookWrapper';
import useScrollToSingleSelect from '../../../../components/common-components/FilterSelector/useScrollToSingleSelect';

const scrollIntoView = jest.fn();
  
const filteredOptions = [
  singleSelectorOption,
  singleSelectorOption,
];

const listRefs = {
  current: filteredOptions.map(() => ({
    current: {
      scrollIntoView,
    }
  }))
} as any;

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('test useScrollToSingleSelect', () => {
  it('test selectedIndex is not number', () => {
    const newSelectedIndex = undefined;

    const Wrapper = TestHookWrapper(useScrollToSingleSelect)(listRefs, newSelectedIndex);
    const wrapper = mount(
      <Wrapper />
    );
    
    expect(scrollIntoView).not.toBeCalled();
  });

  it('test selectedIndex is number and "not" have itemRefNow(undefined)', () => {
    const newSelectedIndex = 10;

    const Wrapper = TestHookWrapper(useScrollToSingleSelect)(listRefs, newSelectedIndex);
    const wrapper = mount(
      <Wrapper />
    );
    
    expect(scrollIntoView).not.toBeCalled();
  });

  it('test selectedIndex is number and have itemRefNow(not undefined and have current property)', () => {
    const newSelectedIndex = 1;

    const Wrapper = TestHookWrapper(useScrollToSingleSelect)(listRefs, newSelectedIndex);
    const wrapper = mount(
      <Wrapper />
    );
    
    expect(scrollIntoView).toBeCalled();
  });
});