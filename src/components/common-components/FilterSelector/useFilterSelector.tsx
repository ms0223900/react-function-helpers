import React, { useCallback, useReducer } from 'react';
import { useFnsByKeyCode } from '../../../lib/customHooks/useFnsByKeyCode';
import { filter, FitlerActionPayload , resetSelect, ResetSelectActionPayload, select, SelectPayload, setState, toggleDisplaySelects } from './actions';
import reducer from './reducers';
import { FilterSelectorContainerProps, FilterSelectorContainerStates } from './types';

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
    defaultSelectedText=initDefaultSelectedText, 
    options, 
    getSelectedOptionFn, 
  } = props;

  const [state, dispatch] = React.useReducer(reducer, ({
    ...initFilterSelectorContainerState,
    selectedText: defaultSelectedText,
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
    dispatch(resetSelect({
      options,
      defaultSelectedText,
    }));
  }, [options]);

  const handleToggleDisplaySelects = useCallback(() => {
    dispatch(toggleDisplaySelects());
  }, []);

  const handleCloseDisplaySelects = useCallback(() => {
    if(state.isDisplaySelects) {
      dispatch(toggleDisplaySelects());
    };
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