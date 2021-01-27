import React from "react";
import { Box } from "@material-ui/core";
import UploadForm from "../components/UploadForm";
import PreviewPart from "../components/PreviewPart";
import useUploadForm, { UseUploadFormOptions } from "./functions/useUploadForm";
import { PreviewPartProps } from "../components/types";

export interface UploadFormContainerProps extends UseUploadFormOptions, Pick<PreviewPartProps, 'previewImageProps'> {
  
}

const UploadFormContainer = (props: UploadFormContainerProps) => {
  const state = useUploadForm(props);

  return (
    <UploadForm
      {...state}
      boxRef={state.dropElRef}
      onChangeFiles={state.handleChangeFiles}
      onSubmit={state.handleSubmit}
    >
      <PreviewPart 
        previewImageList={state.previewFileList} 
        previewImageProps={props.previewImageProps} 
        onRemoveImage={state.handleRemoveFile}
      />
    </UploadForm>
  );
};

export default UploadFormContainer;
