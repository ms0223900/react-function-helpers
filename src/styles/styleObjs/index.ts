import { makeStyles, Theme } from "@material-ui/core";
import { CSSProperties, Styles, WithStylesOptions } from "@material-ui/styles";

export const clickBG: {
  ['clickBG']: CSSProperties
} = {
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