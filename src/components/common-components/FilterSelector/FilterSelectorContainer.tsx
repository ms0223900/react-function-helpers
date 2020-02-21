import React, {  } from 'react';
import { FilterSelectorContainerProps } from './types';
import FilterSelector from './FilterSelector';
import useFilterSelector from './useFilterSelector';

const FilterSelectorContainer = (props: FilterSelectorContainerProps) => {
  const {
    state,
    handleFilter,
    handleSelect,
    handleToggleDisplaySelects,
  } = useFilterSelector(props);

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

export default FilterSelectorContainer;