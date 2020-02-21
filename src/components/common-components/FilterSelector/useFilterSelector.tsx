import React, { useReducer, useCallback } from 'react';
import { FilterSelectorContainerStates, FilterSelectorContainerProps } from './types';
import { useFnsByKeyCode } from '../../../lib/customHooks/useFnsByKeyCode';
import reducer from './reducers';
import { filter, toggleDisplaySelects , resetSelect, select, SelectPayload, ResetSelectActionPayload, FitlerActionPayload, setState } from './actions';

const initDefaultSelectedText = '--請選擇路線';

export const initFilterSelectorContainerState: FilterSelectorContainerStates = ({
  selectedIndex: undefined,
  selectedText: initDefaultSelectedText,
  isDisplaySelects: false,
  filterInput: '',
  filteredOptions: [],
});

const useFilterSelector = (props: FilterSelectorContainerProps) => {
  const {
    defaultSelectedText, options, getSelectedOptionFn, 
  } = props;

  const [state, dispatch] = React.useReducer(reducer, ({
    ...initFilterSelectorContainerState,
    selectedText: defaultSelectedText ? defaultSelectedText : initDefaultSelectedText
  }));

  const handleSelect = useCallback((selectedIndex: number) => {
    const payload: SelectPayload = {
      selectedIndex,
      options,
      getSelectedOptionFn
    };
    dispatch(select(payload));
  }, [options, getSelectedOptionFn]);

  const handleResetSelect = useCallback(() => {
    dispatch(resetSelect(options));
  }, [options]);

  const handleToggleDisplaySelects = useCallback(() => {
    dispatch(toggleDisplaySelects());
  }, []);

  const handleCloseDisplaySelects = useCallback(() => {
    state.isDisplaySelects && dispatch(toggleDisplaySelects());
  }, [state.isDisplaySelects]);

  const handleFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: filterInput } = e.target;
    const payload: FitlerActionPayload = {
      filterInput,
      options,  
    };
    dispatch(filter(payload));
  }, [options]);

  const {
    index,
  } = useFnsByKeyCode({
    lastIndex: state.filteredOptions.length - 1,
    confirmFn: () => typeof state.selectedIndex === 'number' && handleSelect(state.selectedIndex),
    escapeFn: handleCloseDisplaySelects,
  });

  React.useEffect(() => {
    handleResetSelect();
  }, [handleResetSelect]);

  React.useEffect(() => {
    dispatch(setState({
      selectedIndex: index,
    }));
  }, [index]);
  
  return ({
    state,
    handleFilter,
    handleSelect,
    handleResetSelect,
    handleCloseDisplaySelects,
    handleToggleDisplaySelects,
  });
};

export default useFilterSelector;