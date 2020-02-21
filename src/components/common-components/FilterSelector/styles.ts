import { makeStyles } from "@material-ui/core";
import { clickBG } from "../../../styles/styleObjs";


export const useStylesSelectsInFilter = makeStyles(theme => ({
  root: {
    position: 'absolute',
    zIndex: 20202,
    width: '100%',
    // maxWidth: 400,
    backgroundColor: '#fff',
    // textAlign: 'center',
  },

  selects: {
    maxHeight: 400,
    padding: theme.spacing(1),
    overflow: 'auto',
  },

  ...clickBG,
}));