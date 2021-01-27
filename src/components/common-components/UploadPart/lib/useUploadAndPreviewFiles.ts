import React, { useCallback } from "react";
import readFileList from "./readFileList";
import useUpload, { UseUploadOptions } from "./useUpload";
import usePreviewImages from "./usePreviewImages";
import { RequestInit } from "./types";

export interface UseUploadAndPreviewFilesOptions
  extends Omit<UseUploadOptions, "request" | "overMaxUploadFileMessage"> {
  maxUploadFileAmount?: number;
}

const useUploadAndPreviewFiles = (options: UseUploadAndPreviewFilesOptions) => {
  const { maxUploadFileAmount } = options;

  const {
    previewFileList,
    setPreviewFiles,
    handleAddPreviewFiles,
    handleRemovePreviewFile,
  } = usePreviewImages();

  const readFileListFn = readFileList(handleAddPreviewFiles);
  const overMaxUploadFileMessage = `Over limit of max ${maxUploadFileAmount} files`;

  const {
    fileList,
    setFiles,
    handleUpload,
    handleAddFiles,
    handleRemoveFile,
    handleChangeFiles
  } = useUpload({
    ...options,
    overMaxUploadFileMessage,
    onSetFiles: readFileListFn,
    onRemoveFile: handleRemovePreviewFile,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("someName", "someValue");

      // 在這邊依照API的規範append 你的 files
      if (fileList) {
        console.log(fileList);
        for (const _file of Array.from(fileList)) {
          // ...
        }
      }
      const request: RequestInit = {
        method: "POST",
        body: formData
      };
      return handleUpload(request);
    },
    [fileList, handleUpload]
  );

  return {
    fileList,
    setFiles,
    previewFileList,
    setPreviewFiles,
    handleAddFiles,
    handleRemoveFile,
    handleSubmit,
    handleChangeFiles
  };
};

export default useUploadAndPreviewFiles;
