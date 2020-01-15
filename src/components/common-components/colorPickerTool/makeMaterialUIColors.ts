
import { Color } from '@material-ui/core';
import * as Colors from '@material-ui/core/colors';

export const COLOR_NAME_REMOVED = 'common';

export const getMaterialColorNames = () => {
  const colorNames = Object.keys(Colors);
  const colorNamesRemoveCommon = colorNames.filter(color => color !== COLOR_NAME_REMOVED) as ColorKeys;
  return colorNamesRemoveCommon;
};

type ColorKeys = (keyof typeof Colors)[]
const makeAllColorsArr = () => {
  const colorNamesRemoveCommon = getMaterialColorNames();
  return colorNamesRemoveCommon.map(color => Colors[color]) as Color[];
};

const allColorsArr = makeAllColorsArr();

export default allColorsArr;