import { Callback } from 'all-common-types';
import React, { forwardRef, Ref, useImperativeHandle } from 'react';
import FilterSelector from './FilterSelector';
import { FilterSelectorContainerProps } from './types';
import useFilterSelector from './useFilterSelector';

const FilterSelectorContainer = (props: FilterSelectorContainerProps, ref: Ref<{
  resetFilterSelector: Callback
}>) => {
  const {
    state,
    handleFilter,
    handleResetSelect,
    handleSelect,
    handleToggleDisplaySelects,
  } = useFilterSelector(props);

  useImperativeHandle(ref, () => {
    return ({
      resetFilterSelector: handleResetSelect,
    });
  }, [handleResetSelect]);

  return (
    <FilterSelector
      {...state}
      {...props}
      selectFn={handleSelect}
      filterFn={handleFilter}
      toggleDisplaySelectsFn={handleToggleDisplaySelects}
    />
  );
};

export default forwardRef(FilterSelectorContainer);