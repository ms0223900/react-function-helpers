import React, { Ref, RefObject } from "react";
import { Box, makeStyles, RootRef, Theme, Typography } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";

export interface DragDropFileBoxProps {
  isDragging: boolean;
  boxRef: RefObject<HTMLElement>;
}

const useStyles = makeStyles<Theme, DragDropFileBoxProps>((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    border: "2px solid #eee",
    borderStyle: "dashed",
    borderColor: theme.palette.primary.dark,
    backgroundColor: (props) => (props.isDragging ? "#bbb" : "#fff"),
    opacity: 0.75
  }
}));

const DragDropFileBox = (props: DragDropFileBoxProps) => {
  const { boxRef } = props;
  const classes = useStyles(props);

  return (
    <RootRef rootRef={boxRef}>
      <Box
        className={classes.root}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <FileCopy fontSize={"large"} />
        <Typography>{"Drag files here."}</Typography>
      </Box>
    </RootRef>
  );
};

export default DragDropFileBox;
