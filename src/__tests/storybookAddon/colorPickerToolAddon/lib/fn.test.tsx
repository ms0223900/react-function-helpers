import { setThemeColorsFn } from '../../../../storybookAddon/colorPickerToolAddon/lib/fn';
import { ThemeCustomizableColors } from '../../../../storybookAddon/colorPickerToolAddon/lib/createCustomThemeByColors';
import { EVENT_SET_THEME } from '../../../../storybookAddon/colorPickerToolAddon/dist/config';

describe('test file', () => {
  it('test setThemeColorsFn', () => {
    const emit = jest.fn();
    const colors: ThemeCustomizableColors = {
      primary: '',
      secondary: ''
    };
    setThemeColorsFn(emit)(colors);
    expect(emit).toBeCalledWith(EVENT_SET_THEME, {
      themeColors: colors
    });
  });

});
