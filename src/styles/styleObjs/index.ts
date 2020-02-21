import { Styles, WithStylesOptions, CSSProperties } from "@material-ui/styles";
import { Theme, makeStyles } from "@material-ui/core";

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