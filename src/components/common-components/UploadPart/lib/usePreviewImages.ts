import { useCallback, useState } from "react";
import { ImagePreviewFile } from "./types";

const usePreviewImages = () => {
  const [previewFileList, setPreviewFiles] = useState<ImagePreviewFile[]>([]);

  const handleAddPreviewFiles = useCallback((previewFile: ImagePreviewFile) => {
    setPreviewFiles((f) => [...f, previewFile]);
  }, []);

  const handleRemovePreviewFile = useCallback((index: number) => () => {
    setPreviewFiles((f) => (
      f.filter((_f, i) => i !== index)
    ));
  }, []);

  return {
    previewFileList,
    setPreviewFiles,
    handleAddPreviewFiles,
    handleRemovePreviewFile,
  };
};
export default usePreviewImages;
