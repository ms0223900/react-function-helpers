import { FilterSelectorContainerStates, FilterSelectorContainerProps } from './types';

export enum FilterSelectorActionTypes {
  SET_STATE,
  TOGGLE_DISPLAY_SELECTS,
  RESET_SELECTED,
  SELECT,
  FILTER,
} 

export interface ToggleDisplaySelectsAction {
  type: FilterSelectorActionTypes.TOGGLE_DISPLAY_SELECTS,
}
export interface SelectAction {
  type: FilterSelectorActionTypes.SELECT,
  payload: SelectPayload
}
export interface ResetSelectAction {
  type: FilterSelectorActionTypes.RESET_SELECTED,
  payload: ResetSelectActionPayload
}
export interface FilterAction {
  type: FilterSelectorActionTypes.FILTER,
  payload: FitlerActionPayload
}
export interface SetStateAction {
  type: FilterSelectorActionTypes.SET_STATE,
  payload: SetStateActionPayload
}
export type FilterSelectorActions = ToggleDisplaySelectsAction | SelectAction | ResetSelectAction | FilterAction | SetStateAction

export interface SelectPayload {
  selectedIndex: number
  options: FilterSelectorContainerProps['options']
  getSelectedOptionFn?: FilterSelectorContainerProps['getSelectedOptionFn']
}
export type ResetSelectActionPayload = FilterSelectorContainerProps['options']
export interface FitlerActionPayload {
  filterInput: FilterSelectorContainerStates['filterInput']
  options: FilterSelectorContainerProps['options']
}
export type SetStateActionPayload = Partial<FilterSelectorContainerStates>;

export const select = (payload: SelectPayload): SelectAction => ({
  type: FilterSelectorActionTypes.SELECT,
  payload,
});

export const resetSelect = (payload: ResetSelectActionPayload): ResetSelectAction => ({
  type: FilterSelectorActionTypes.RESET_SELECTED,
  payload,
});

export const toggleDisplaySelects = (): ToggleDisplaySelectsAction => ({
  type: FilterSelectorActionTypes.TOGGLE_DISPLAY_SELECTS,
});

export const filter = (payload: FitlerActionPayload): FilterAction => ({
  type: FilterSelectorActionTypes.FILTER,
  payload,
});

export const setState = (payload: SetStateActionPayload): SetStateAction => ({
  type: FilterSelectorActionTypes.SET_STATE,
  payload,
});