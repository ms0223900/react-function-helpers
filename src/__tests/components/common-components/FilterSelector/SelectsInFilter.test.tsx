import React from 'react';
import { shallow } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import SelectsInFilter, { SingleSelect, NoOptionsInfo } from '../../../../components/common-components/FilterSelector/SelectsInFilter';
import { selectsInFilterProps, singleSelectorOption, singleSelectProps } from './__mocks/common-mocks';
import { TextField } from '@material-ui/core';
import { SelectorOptions } from '../../../../components/common-components/FilterSelector/types';

describe('test components in SelectsInFilter', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <SelectsInFilter {...selectsInFilterProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('NoOptionsInfo should render correctly', () => {
    const tree = renderer.create(
      <NoOptionsInfo input={''} />
    ).toJSON();
    expect(tree).toMatchSnapshot(); 
  });

  it('SingleSelect should render correctly', () => {
    const tree = renderer.create(
      <SingleSelect {...singleSelectProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot(); 
  });
});

describe('test SelectsInFilter components determined by props.filteredOptions.length', () => {
  it('props.filteredOptions.length > 0 condition(render SingleSelect)', () => {
    const filteredOptions = [singleSelectorOption];
    const wrapper = shallow(
      <SelectsInFilter 
        {...selectsInFilterProps}
        filteredOptions={filteredOptions} />
    );
    expect(wrapper.find(SingleSelect)).toHaveLength(filteredOptions.length);
  });

  it('props.filteredOptions.length > 0 condition(render SingleSelect)', () => {
    const filteredOptions: SelectorOptions = [];
    const wrapper = shallow(
      <SelectsInFilter 
        {...selectsInFilterProps}
        filteredOptions={filteredOptions} />
    );
    expect(wrapper.find(SingleSelect)).toHaveLength(0);
    expect(wrapper.find(NoOptionsInfo)).toHaveLength(1);
  });
});

describe('test functions should be trigger correctly', () => {
  it('test handleClose', () => {
    const closeSelectsFn = jest.fn();
    const wrapper = shallow(
      <SelectsInFilter 
        {...selectsInFilterProps}
        closeSelectsFn={closeSelectsFn} />
    );

    expect(closeSelectsFn).not.toBeCalled();
    act(() => {
      const { onClick } = wrapper.find('#selectsInFilterBG').props();
      onClick && onClick({} as any);
    });
    
    expect(closeSelectsFn).toBeCalled();
  });

  it('test handleSelectRoute', () => {
    const index = 1;
    const selectFn = jest.fn();
    const wrapper = shallow(
      <SelectsInFilter 
        {...selectsInFilterProps}
        selectFn={selectFn}
        filteredOptions={[
          singleSelectorOption,
          singleSelectorOption,
        ]} />
    );

    expect(selectFn).not.toBeCalled();
    act(() => {
      const { clickFn } = wrapper.find(SingleSelect).at(index).props();
      clickFn && clickFn(index);
    });

    expect(selectFn).toBeCalledWith(index);
  });

  it('test filterFn', () => {
    const e = { target: { value: '', }, } as React.ChangeEvent<HTMLInputElement>;
    const filterFn = jest.fn();
    const wrapper = shallow(
      <SelectsInFilter 
        {...selectsInFilterProps}
        filterFn={filterFn}
        filteredOptions={[
          singleSelectorOption,
          singleSelectorOption,
        ]} />
    );

    expect(filterFn).not.toBeCalled();
    act(() => {
      const { onChange } = wrapper.find(TextField).props();
      onChange && onChange(e);
    });
    expect(filterFn).toBeCalled();
  });

});
