import { SelectPayload, ResetSelectActionPayload, FitlerActionPayload, SetStateActionPayload } from "../../../../../components/common-components/FilterSelector/actions";
import { SingleSelectorOption, FilterSelectorContainerStates, FilterSelectorContainerProps } from "../../../../../components/common-components/FilterSelector/types";

export const singleSelectorOption: SingleSelectorOption = {
  value: 'a',
  text: 'A',
};

export const selectPayload: SelectPayload = {
  selectedIndex: 0,
  options: [],
};

export const resetSelectActionPayload: ResetSelectActionPayload = [singleSelectorOption];

export const fitlerActionPayload: FitlerActionPayload = {
  filterInput: '',
  options: [],
};

export const setStateActionPayload: SetStateActionPayload = {
  selectedText: 'cjk',
};

export const customInitState: FilterSelectorContainerStates = {
  selectedIndex: 10,
  selectedText: 'abc',
  isDisplaySelects: true,
  filterInput: 'aaa',
  filteredOptions: [
    singleSelectorOption,
    singleSelectorOption,
  ]
};

export const filterSelectorContainerProps: FilterSelectorContainerProps = {
  options: [singleSelectorOption],
  defaultSelectedText: 'bb',
};