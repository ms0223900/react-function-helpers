import React, {  } from 'react';
import FilterSelector from './FilterSelector';
import { FilterSelectorContainerProps } from './types';
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