import React from 'react';
import { shallow, mount } from 'enzyme';
import allColorsArr, { getMaterialColorNames, COLOR_NAME_REMOVED } from 'components/common-components/colorPickerTool/makeMaterialUIColors';

describe('test makeMaterialUIColors', () => {
  it('test getMaterialColorNames', () => {
    const colorNames = getMaterialColorNames();
    const checkHaveColorNameRemoved = !!colorNames.find(name => name === COLOR_NAME_REMOVED);
    expect(checkHaveColorNameRemoved).toBeFalsy();
  });

  it('test makeAllColorsArr', () => {
    const allColors = allColorsArr;
    expect(allColors[0]).toEqual(expect.any(Object));
  });
});