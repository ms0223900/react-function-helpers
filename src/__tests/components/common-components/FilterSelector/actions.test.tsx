import { select, resetSelect, toggleDisplaySelects, filter, setState, SelectAction, FilterSelectorActionTypes, ResetSelectAction, ToggleDisplaySelectsAction, FilterAction, SetStateAction } from '../../../../components/common-components/FilterSelector/actions';
import { selectPayload, resetSelectActionPayload, fitlerActionPayload, setStateActionPayload } from './__mocks/common-mocks';

describe('test actions', () => {
  it('test select', () => {
    const res = select(selectPayload);
    const _expect: SelectAction = {
      type: FilterSelectorActionTypes['SELECT'],
      payload: selectPayload,
    };
    expect(res).toEqual(_expect);
  });

  it('test resetSelect', () => {
    const res = resetSelect(resetSelectActionPayload);
    const _expect: ResetSelectAction = {
      type: FilterSelectorActionTypes['RESET_SELECTED'],
      payload: resetSelectActionPayload,
    };
    expect(res).toEqual(_expect);
  });

  it('test toggleDisplaySelects', () => {
    const res = toggleDisplaySelects();
    const _expect: ToggleDisplaySelectsAction = {
      type: FilterSelectorActionTypes['TOGGLE_DISPLAY_SELECTS'],
    };
    expect(res).toEqual(_expect);
  });

  it('test filter', () => {
    const res = filter(fitlerActionPayload);
    const _expect: FilterAction = {
      type: FilterSelectorActionTypes['FILTER'],
      payload: fitlerActionPayload,
    };
    expect(res).toEqual(_expect);
  });

  it('test setState', () => {
    const res = setState(setStateActionPayload);
    const _expect: SetStateAction = {
      type: FilterSelectorActionTypes['SET_STATE'],
      payload: setStateActionPayload,
    };
    expect(res).toEqual(_expect);
  });
});