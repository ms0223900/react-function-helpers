import { ColorPercent } from "./types";
import { ID } from "all-common-types";

export enum ACTION_TYPES {
  'ADD_COLOR',
  'DELETE_COLOR',
  'EDIT_COLOR_PERCENT',
  'EDIT_DEGREE'
}

export interface AddColorAction {
  type: ACTION_TYPES.ADD_COLOR,
}
export interface EditColorAction {
  type: ACTION_TYPES.EDIT_COLOR_PERCENT,
  payload: EditColorActionPayload
}
export interface DeleteColorAction {
  type: ACTION_TYPES.DELETE_COLOR,
  payload: DeleteColorActionPayload
}
export interface EditDegreeAction {
  type: ACTION_TYPES.EDIT_DEGREE,
  payload: EditDegreeActionPayload
}

export const addColor = (): AddColorAction => ({
  type: ACTION_TYPES.ADD_COLOR,
});
export const editColor = (payload: EditColorActionPayload): EditColorAction => ({
  type: ACTION_TYPES.EDIT_COLOR_PERCENT,
  payload,
});
export const deleteColor = (payload: DeleteColorActionPayload): DeleteColorAction => ({
  type: ACTION_TYPES.DELETE_COLOR,
  payload,
});
export const editDegree = (payload: EditDegreeActionPayload): EditDegreeAction => ({
  type: ACTION_TYPES.EDIT_DEGREE,
  payload
});

export interface EditColorActionPayload {
  id: ID,
  name: ColorPercent,
  value: string,
}
export interface DeleteColorActionPayload {
  id: ID,
}
export interface EditDegreeActionPayload {
  degree: number
}

export type GradientActions = 
  AddColorAction |
  EditColorAction |
  DeleteColorAction |
  EditDegreeAction;