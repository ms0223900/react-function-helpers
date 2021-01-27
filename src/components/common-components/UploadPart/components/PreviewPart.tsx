import React from "react";
import { Box, Typography } from "@material-ui/core";
import { PreviewPartProps } from "./types";
import PreviewImageItem from "./PreviewImageItem";

const PreviewPart = (props: PreviewPartProps) => {
  const {
    previewImageList,
  } = props;
  
  return (
    <Box padding={2}>
      <Typography variant={"h6"}>{"檔案預覽"}</Typography>
      {previewImageList.map((file, i) => (
        <PreviewImageItem 
          key={i} 
          index={i}
          file={file}
          {...props}
        />
      ))}
    </Box>
  );
};

export default PreviewPart;
