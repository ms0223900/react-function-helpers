import { ChangeEvent, useCallback, useState } from "react";
import { RequestInit } from "./types";
import uploadFetch, { UploadFetchOptions } from "./uploadFetch";

export interface UseUploadOptions extends UploadFetchOptions {
  maxUploadFileAmount?: number;
  overMaxUploadFileMessage: string;
  onSetFiles?: (fileList: FileList) => any;
  onRemoveFile?: (index: number) => any
}

const useUpload = (options: UseUploadOptions) => {
  const {
    maxUploadFileAmount = Infinity,
    overMaxUploadFileMessage,
    onSetFiles,
    onRemoveFile,
  } = options;
  const [fileList, setFiles] = useState<FileList | null>(null);

  const handlePushFileList = useCallback((_files: FileList) => {
    setFiles((files) => {
      if (!files) {
        return _files;
      } else {
        return [...Array.from(files), ...Array.from(_files)] as any;
      }
    });
  }, []);

  const handleAddFiles = useCallback(
    (_files: FileList) => {
      const fileListAmount = fileList ? fileList.length : 0;
      const isOverUploadLimit =
        _files.length + fileListAmount > maxUploadFileAmount;

      if (isOverUploadLimit) {
        window.alert(overMaxUploadFileMessage);
      } else {
        handlePushFileList(_files);
        onSetFiles && onSetFiles(_files);
      }
    },
    [
      fileList,
      handlePushFileList,
      maxUploadFileAmount,
      onSetFiles,
      overMaxUploadFileMessage
    ]
  );

  const handleRemoveFile = useCallback((index: number) => () => {
    const removeConfirmed = window.confirm('Do you sure remove this file?');
    if(fileList && removeConfirmed) {
      const handledFiles = Array.from(fileList).filter((f, i) => i !== index) as any;
      setFiles(handledFiles);
      onRemoveFile && onRemoveFile(index) && 
      typeof onRemoveFile(index) === 'function' && onRemoveFile(index)();
    }
  }, [fileList, onRemoveFile]);

  const handleChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (files) {
        handleAddFiles(files);
      }
    },
    [handleAddFiles]
  );

  const handleUpload = useCallback(
    (request: RequestInit) =>
      uploadFetch({
        ...options,
        request
      }),
    [options]
  );

  return {
    fileList,
    setFiles,
    handleAddFiles,
    handleRemoveFile,
    handleChangeFiles,
    handleUpload
  };
};
export default useUpload;
