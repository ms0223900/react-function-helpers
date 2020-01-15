import addons from "@storybook/addons";
import { Callback } from "all-common-types";
import { EVENT_SET_THEME } from "../config";
import { ThemeCustomizableColors } from './createCustomThemeByColors';

type Emit = (type: string, ...args: any[]) => any
export interface MESSAGE_SET_THEME {
  themeColors: ThemeCustomizableColors,
}

export const setThemeColorsFn = (emit: Emit) => (colors: ThemeCustomizableColors) => {
  emit(EVENT_SET_THEME, {
    themeColors: colors,
  });
};

export const connectToChannelAndDisconnect = (eventName: string, fn: Callback) => {
  const channel = addons.getChannel();
  channel.on(eventName, fn);
  return () => channel.removeListener(eventName, fn);
};