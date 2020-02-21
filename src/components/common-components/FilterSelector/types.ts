import { Callback } from "all-common-types";
import { ChangeEvent } from "react";

export interface SingleSelectorOption {
  text: string
  value: string
  [x: string]: any
}
export type SelectorOptions = SingleSelectorOption[]
export type GetSelectedOptionFn = (selected: SingleSelectorOption) => any

export interface SingleSelectProps {
  option: SingleSelectorOption
  isSelected: boolean
  clickFn?: Callback
}

export interface SelectsInFilterProps {
  filterFn?: (e: ChangeEvent<HTMLInputElement>) => any 
  selectFn?: (index: number) => any
  closeSelectsFn?: Callback
  filterInput: string
  filteredOptions: SelectorOptions
  selectedIndex: number | undefined
}

export interface FilterSelectorProps extends SelectsInFilterProps {
  isDisplaySelects: boolean
  selectedText: string
  options: SelectorOptions
  toggleDisplaySelectsFn?: Callback
}

export interface FilterSelectorContainerProps {
  defaultSelectedText?: string
  options: SelectorOptions
  getSelectedOptionFn?: GetSelectedOptionFn
}

export interface FilterSelectorContainerStates {
  selectedIndex: number | undefined
  selectedText: string
  isDisplaySelects: boolean
  filterInput: string
  filteredOptions: SelectorOptions
}