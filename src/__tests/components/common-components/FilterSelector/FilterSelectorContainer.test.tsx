import React, { useRef, RefObject } from 'react';
import { shallow, mount } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import FilterSelectorContainer from '../../../../components/common-components/FilterSelector/FilterSelectorContainer';
import { filterSelectorContainerProps } from './__mocks/common-mocks';
import FilterSelector from '../../../../components/common-components/FilterSelector/FilterSelector';

describe('test FilterSelectorContainer', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <FilterSelectorContainer 
        {...filterSelectorContainerProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('test functions should be trigger correctly', () => {
    const wrapper = shallow(
      <FilterSelectorContainer 
        {...filterSelectorContainerProps} />
    );
    const props = wrapper.find(FilterSelector).props();

    expect(props.selectFn).toEqual(expect.any(Function));
    expect(props.filterFn).toEqual(expect.any(Function));
    expect(props.toggleDisplaySelectsFn).toEqual(expect.any(Function));
  });

  it('test useImperativeHandle', () => {
    let ref: RefObject<{
      resetFilterSelector: any
    }> = { 
      current: null 
    };

    const Wrapper = () => {
      ref = useRef(null);
      return (
        <FilterSelectorContainer 
          {...filterSelectorContainerProps}
          ref={ref} />
      );
    };
    const wrapper = mount(
      <Wrapper />
    );

    expect(ref.current && ref.current.resetFilterSelector).toEqual(expect.any(Function));
  });

});