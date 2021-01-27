import useDragDropFiles from "../../lib/useDragDropFiles";
import useUploadAndPreviewFiles, { UseUploadAndPreviewFilesOptions } from "../../lib/useUploadAndPreviewFiles";


// 自訂訊息
const onUploadSuccess = (e: any) => {
  window.alert("Upload Success!");
};
const onUploadFailed = (e: any) => {
  window.alert(`Upload failed: ${e.message}`);
};

export interface UseUploadFormOptions extends Pick<UseUploadAndPreviewFilesOptions, 'uploadApiUrl' | 'maxUploadFileAmount'> {
}

const useUploadForm = ({
  uploadApiUrl, maxUploadFileAmount=Infinity
}: UseUploadFormOptions) => {
  const uploadAndPreviewFilesState = useUploadAndPreviewFiles({
    uploadApiUrl,
    maxUploadFileAmount,
    onUploadSuccess,
    onUploadFailed
  });

  const dragDropFilesState = useDragDropFiles({
    onSetDropFiles: uploadAndPreviewFilesState.handleAddFiles
  });

  return {
    ...uploadAndPreviewFilesState,
    ...dragDropFilesState
  };
};

export default useUploadForm;
