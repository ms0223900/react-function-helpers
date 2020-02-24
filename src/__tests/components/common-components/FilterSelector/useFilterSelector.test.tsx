import React from 'react';
import { shallow, mount } from 'enzyme';
import { FilterSelectorContainerStates, FilterSelectorContainerProps, SelectorOptions } from '../../../../components/common-components/FilterSelector/types';
import useFilterSelector, { initFilterSelectorContainerState } from '../../../../components/common-components/FilterSelector/useFilterSelector';
import { customInitState, filterSelectorContainerProps, fitlerActionPayload } from './__mocks/common-mocks';
import { act } from 'react-dom/test-utils';
import { select, resetSelect, toggleDisplaySelects, filter, setState } from '../../../../components/common-components/FilterSelector/actions';
import * as KEYCODE from '../../../../config';

let dispatchFn = jest.fn();

beforeEach(() => {
  dispatchFn = jest.fn();
  jest.spyOn(React, 'useReducer').mockImplementation(() => {
    return ([customInitState, dispatchFn]);
  });
});

const HookWrapper = (props: ReturnType<typeof useFilterSelector>) => <></>;
const hookWrapperFn = (props: FilterSelectorContainerProps) => {
  return (_props: Partial<FilterSelectorContainerProps>) => {
    const hook = useFilterSelector({
      ...props,
      ..._props,
    });
    return (
      <HookWrapper {...hook} />
    );
  };
};

const DefaultHookWrapper = hookWrapperFn(filterSelectorContainerProps);

describe('test useFilterSelector hook', () => {
  it('test handleSelect', () => {
    const selectedIndex = 10;
    const wrapper = shallow(
      <DefaultHookWrapper />
    );
    const action = select({
      options: customInitState.filteredOptions,
      getSelectedOptionFn: filterSelectorContainerProps.getSelectedOptionFn,
      selectedIndex,
    });
    const { handleSelect } = wrapper.find(HookWrapper).props();

    act(() => {
      handleSelect(selectedIndex);
    });

    expect(dispatchFn).toBeCalledWith(action);
  });

  it('test handleResetSelect', () => {
    const defaultSelectedText = 'dddd';
    const wrapper = shallow(
      <DefaultHookWrapper
        defaultSelectedText={defaultSelectedText} />
    );
    const action = resetSelect({
      options: filterSelectorContainerProps.options,
      defaultSelectedText,
    });
    const { handleResetSelect } = wrapper.find(HookWrapper).props();

    act(() => {
      handleResetSelect();
    });

    expect(dispatchFn).toBeCalledWith(action);
  });

  it('test handleToggleDisplaySelects', () => {
    const wrapper = shallow(
      <DefaultHookWrapper />
    );
    const action = toggleDisplaySelects();
    const { handleToggleDisplaySelects } = wrapper.find(HookWrapper).props();

    act(() => {
      handleToggleDisplaySelects();
    });

    expect(dispatchFn).toBeCalledWith(action);
  });

  it('test handleFilter', () => {
    const wrapper = shallow(
      <DefaultHookWrapper />
    );
    const event = {
      target: { value: fitlerActionPayload.filterInput }
    } as React.ChangeEvent<HTMLInputElement>;

    const payload = {
      ...fitlerActionPayload,
      options: filterSelectorContainerProps.options,
    };
    const action = filter(payload);
    const { handleFilter } = wrapper.find(HookWrapper).props();

    act(() => {
      handleFilter(event);
    });

    expect(dispatchFn).toBeCalledWith(action);
  });
});

describe('test handleCloseDisplaySelects', () => {
  it('test handleCloseDisplaySelects(state.isDisplaySelects is true)', () => {
    const wrapper = shallow(
      <DefaultHookWrapper />
    );
    const action = toggleDisplaySelects();
    const { handleCloseDisplaySelects } = wrapper.find(HookWrapper).props();

    act(() => {
      handleCloseDisplaySelects();
    });

    expect(dispatchFn).toBeCalledWith(action);
  });

  it('test handleCloseDisplaySelects(state.isDisplaySelects is false)', () => {
    jest.spyOn(React, 'useReducer').mockImplementation(() => {
      return ([{
        ...customInitState,
        isDisplaySelects: false,
      }, dispatchFn]);
    });
    const wrapper = shallow(
      <DefaultHookWrapper />
    );
    const { handleCloseDisplaySelects } = wrapper.find(HookWrapper).props();

    act(() => {
      handleCloseDisplaySelects();
    });

    expect(dispatchFn).not.toBeCalled();
  });
});

describe('test useEffect functions', () => {
  it('test handleResetSelect to be called after props.options changed', () => {
    const newOptions: SelectorOptions = [];
    const defaultSelectedText = '';

    const wrapper = mount(
      <DefaultHookWrapper
        defaultSelectedText={defaultSelectedText} />
    );

    expect(dispatchFn).toBeCalledTimes(2);
    act(() => {
      wrapper.setProps({
        options: newOptions,
      });
      wrapper.update();
    });

    const action = resetSelect({
      options: newOptions,
      defaultSelectedText,
    });
    expect(dispatchFn).toHaveBeenNthCalledWith(3, action);
  });

  it('test setState action should be dispatched', () => {
    const container: {
      [x: string]: any
    } = {};
    window.addEventListener = jest.fn((ev, cb) => {
      container[ev] = cb;
    });

    const wrapper = mount(
      <DefaultHookWrapper />
    );
    const action = setState({
      selectedIndex: expect.any(Number),
    });

    expect(dispatchFn).toBeCalledTimes(2);

    act(() => {
      container.keydown({ keyCode: KEYCODE.ARROW_UP });
    });

    expect(dispatchFn).toHaveBeenNthCalledWith(3, action);
  });
});

