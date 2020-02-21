import reducer from '../../../../components/common-components/FilterSelector/reducers';
import { select, ResetSelectActionPayload, resetSelect, filter, toggleDisplaySelects, setState } from '../../../../components/common-components/FilterSelector/actions';
import { selectPayload, singleSelectorOption, resetSelectActionPayload, fitlerActionPayload, setStateActionPayload, customInitState } from './__mocks/common-mocks';
import { initFilterSelectorContainerState } from '../../../../components/common-components/FilterSelector/useFilterSelector';
import { FilterSelectorContainerStates } from '../../../../components/common-components/FilterSelector/types';
import { filterRoutesByValue } from '../../../../components/common-components/FilterSelector/fn';

const state = customInitState;

describe('test reducer', () => {
  it('test RESET_SELECTED case', () => {
    const payload = resetSelectActionPayload;
    const action = resetSelect(payload);
    const res = reducer(state, action);

    const _expect: FilterSelectorContainerStates = {
      ...state,
      filteredOptions: payload.options,
      selectedText: payload.defaultSelectedText,
      filterInput: initFilterSelectorContainerState.filterInput,
      selectedIndex: initFilterSelectorContainerState.selectedIndex,
    };
    expect(res).toEqual(_expect);
  });

  it('test FILTER case', () => {
    const payload = fitlerActionPayload;
    const action = filter(payload);
    const res = reducer(state, action);

    const _expect: FilterSelectorContainerStates = {
      ...state,
      filterInput: fitlerActionPayload.filterInput,
      filteredOptions: filterRoutesByValue(fitlerActionPayload.filterInput, fitlerActionPayload.options)
    };
    expect(res).toEqual(_expect);
  });

  it('test TOGGLE_DISPLAY_SELECTS case', () => {
    const action = toggleDisplaySelects();
    const res = reducer(state, action);

    const _expect: FilterSelectorContainerStates = {
      ...state,
      isDisplaySelects: !state.isDisplaySelects,
    };
    expect(res).toEqual(_expect);
  });

  it('test SET_STATE case', () => {
    const payload = setStateActionPayload;
    const action = setState(payload);
    const res = reducer(state, action);

    const _expect: FilterSelectorContainerStates = {
      ...state,
      ...payload
    };
    expect(res).toEqual(_expect);
  });
});

describe('test SELECT case', () => {
  const getSelectedOptionFn = jest.fn();

  it('test selected is undefined condition', () => {
    const payload: typeof selectPayload = {
      ...selectPayload,
      selectedIndex: -1,
    };
    const action = select(payload);
    const res = reducer(state, action);

    const _expect = state;
    expect(res).toEqual(_expect);    
  });

  it('test selected is "not" undefined condition', () => {
    const selectedIndex = 0;
    const selected = singleSelectorOption;

    const payload: typeof selectPayload = {
      ...selectPayload,
      selectedIndex,
      options: [singleSelectorOption],
      getSelectedOptionFn,
    };
    const action = select(payload);
    const res = reducer(state, action);

    const _expect: FilterSelectorContainerStates = {
      ...state,
      selectedIndex,
      selectedText: selected.text,
      isDisplaySelects: false,
    };
    
    expect(getSelectedOptionFn).toBeCalledWith(selected);
    expect(res).toEqual(_expect);    
  });
});
