import React, { ReactNode } from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { CloudUploadOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    transition: "0.2s",
    cursor: "pointer",
    "&:hover": {
      transition: "0.2s",
      backgroundColor: "#ddd"
    },
    backgroundColor: "#eee",
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5)
  }
}));

export interface UploadLabelWrapperProps {
  labelText?: ReactNode
  children: ReactNode
}

const UploadLabelWrapper = ({ 
  labelText='Click to upload',
  children 
}: UploadLabelWrapperProps) => {
  const classes = useStyles();

  return (
    <label>
      <Box className={classes.root}>
        <Box display={"flex"} alignItems={"center"}>
          <CloudUploadOutlined fontSize={"large"} color={"primary"} />
          <Typography>{labelText}</Typography>
        </Box>
        <Box style={{ display: "none" }}>{children}</Box>
      </Box>
    </label>
  );
};

export default UploadLabelWrapper;
