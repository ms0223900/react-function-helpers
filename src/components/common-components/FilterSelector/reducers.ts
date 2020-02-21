import { Reducer } from 'all-common-types';
import { FilterSelectorActions, FilterSelectorActionTypes } from './actions';
import { filterRoutesByValue } from './fn';
import { FilterSelectorContainerStates } from './types';
import { initFilterSelectorContainerState } from './useFilterSelector';

type Reducers = Reducer<FilterSelectorContainerStates, FilterSelectorActions, FilterSelectorContainerStates>

const reducer: Reducers = (state, action) => {
  switch (action.type) {
    case FilterSelectorActionTypes.SELECT: {
      const {
        selectedIndex, options, getSelectedOptionFn
      } = action.payload;
      const selected = options[selectedIndex];
      if(selected) {
        if(getSelectedOptionFn) {
          getSelectedOptionFn(selected);
        }
        return ({
          ...state,
          selectedIndex,
          selectedText: selected.text,
          isDisplaySelects: false,
        });
      }
      return state;
    }

    case FilterSelectorActionTypes.RESET_SELECTED:
      return ({
        ...state,
        filteredOptions: action.payload.options,
        selectedText: action.payload.defaultSelectedText,
        filterInput: initFilterSelectorContainerState.filterInput,
        selectedIndex: initFilterSelectorContainerState.selectedIndex,
      });

    case FilterSelectorActionTypes.FILTER: {
      const { filterInput, options } = action.payload;
      const filteredOptions = filterRoutesByValue(filterInput, options);
      return ({
        ...state,
        filterInput,
        filteredOptions,
      });
    }

    case FilterSelectorActionTypes.TOGGLE_DISPLAY_SELECTS:
      return ({
        ...state,
        isDisplaySelects: !state.isDisplaySelects,
      });

    case FilterSelectorActionTypes.SET_STATE: 
      return ({
        ...state,
        ...action.payload,
      });
  }
};

export default reducer;