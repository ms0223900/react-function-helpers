import { ID } from "all-common-types";

export type ColorPercent = 'color' | 'percent'

export interface GradientItemValue {
  id: ID
  color: string
  percent: number | string
}

