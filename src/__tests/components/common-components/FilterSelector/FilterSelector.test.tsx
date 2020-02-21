import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import FilterSelector from '../../../../components/common-components/FilterSelector/FilterSelector';
import { filterSelectorProps } from './__mocks/common-mocks';
import { Selects } from '../../../../components/common-components/FilterSelector/SelectsInFilter';
import { Button } from '@material-ui/core';

describe('test FilterSelector component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <FilterSelector {...filterSelectorProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Selects component should be determined by props.isDisplaySelects', () => {
  it('props.isDisplaySelects is false condition', () => {
    const wrapper = shallow(
      <FilterSelector 
        {...filterSelectorProps}
        isDisplaySelects={false} />
    );
    expect(wrapper.find(Selects)).toHaveLength(0);
  });

  it('props.isDisplaySelects is false condition', () => {
    const wrapper = shallow(
      <FilterSelector 
        {...filterSelectorProps}
        isDisplaySelects={true} />
    );
    expect(wrapper.find(Selects)).toHaveLength(1);
  });
});

describe('test function should be trigger correctly', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const toggleDisplaySelectsFn = jest.fn();

  it('test toggleDisplaySelectsFn(Button)', () => {
    const wrapper = shallow(
      <FilterSelector 
        {...filterSelectorProps}
        isDisplaySelects={true}
        toggleDisplaySelectsFn={toggleDisplaySelectsFn} />
    );
    expect(toggleDisplaySelectsFn).not.toBeCalled();

    act(() => wrapper.find<any>(Button).props().onClick());
    expect(toggleDisplaySelectsFn).toBeCalled();
  });

  it('test toggleDisplaySelectsFn(Selects)', () => {
    const wrapper = shallow(
      <FilterSelector 
        {...filterSelectorProps}
        isDisplaySelects={true}
        toggleDisplaySelectsFn={toggleDisplaySelectsFn} />
    );
    expect(toggleDisplaySelectsFn).not.toBeCalled();

    act(() => wrapper.find<any>(Selects).props().closeSelectsFn());
    expect(toggleDisplaySelectsFn).toBeCalled();
  });
});

