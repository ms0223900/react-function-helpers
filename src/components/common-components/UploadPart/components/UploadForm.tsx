import React, { memo } from "react";
import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import { UploadFormProps } from "./types";
import UploadLabelWrapper from "./UploadLabelWrapper";
import DragDropFileBox from "./DragDropFileBox";

const useStyles = makeStyles((theme) => ({
  root: {},
  uploadInput: {
    display: "none",
    height: 1
  },
  confirmButtonPart: {
    padding: theme.spacing(1),
    textAlign: "center"
  }
}));

const UploadForm = (props: UploadFormProps) => {
  const { isUploadAvailble = true, children, onSubmit, onChangeFiles } = props;
  const classes = useStyles();

  return (
    <Box>
      <form>
        <Paper style={{ padding: 8 }}>
          <UploadLabelWrapper>
            <input type="file" multiple name="files" onChange={onChangeFiles} />
          </UploadLabelWrapper>
          <DragDropFileBox {...props} />
          <hr />
          {children}
        </Paper>
        <Box className={classes.confirmButtonPart}>
          <Button
            disabled={!isUploadAvailble}
            color={"primary"}
            variant={"contained"}
            onClick={onSubmit}
          >
            {"Upload"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default memo(UploadForm);
