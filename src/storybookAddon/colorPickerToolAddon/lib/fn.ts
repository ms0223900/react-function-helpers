import { EVENT_SET_THEME } from "../config";
import addons from "@storybook/addons";
import { Callback } from "all-common-types";

type Emit = (type: string, ...args: any[]) => any
type Colors = {
  primary?: string, 
  secondary?: string, 
  complementaryMain?: string, 
  complementaryDark?: string
}
export const setThemeColorsFn = (emit: Emit) => (colors: Colors) => {
  emit(EVENT_SET_THEME, {
    themeColors: colors,
  });
};

export const connectToChannelAndDisconnect = (eventName: string, fn: Callback) => {
  const channel = addons.getChannel();
  channel.on(eventName, fn);
  return () => channel.removeListener(eventName, fn);
};