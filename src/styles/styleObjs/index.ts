import { Styles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const clickBG: Styles<Theme, any, 'clickBG'> = {
  clickBG: {
    width: '100vw',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    opacity: 0.6,
    zIndex: -1,
  }
};