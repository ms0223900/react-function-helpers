import { ID, Callback } from "all-common-types";

export type ColorPercent = 'color' | 'percent'

export interface GradientItemValue {
  id: ID
  color: string
  percent: number | string
}

export interface ColorPinProps {
  position: {
    x: number,
    y: number,
  },
  gradientItemValue: GradientItemValue,
  isSelected: boolean,
  clickFn?: Callback
}

export interface ColorPinListProps {
  gradientItemValueList: GradientItemValue[]
  setSelectedPercent?: (id: ID, percent: number) => any
}
