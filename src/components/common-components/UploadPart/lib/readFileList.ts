import { ImagePreviewFile } from "./types";

type SetPreviewFileFn = (file: ImagePreviewFile) => any;

const readFileList = (onSetPreviewFile: SetPreviewFileFn) => (
  fileList: FileList | null
) => {
  if (fileList && fileList.length > 0) {
    for (const _file of Array.from(fileList)) {
      const reader = new FileReader();
      const fileName = _file.name;

      reader.onload = (e) => {
        if (e.target) {
          onSetPreviewFile({
            src: e.target.result as string,
            name: fileName
          });
        }
      };
      reader.readAsDataURL(_file);
    }
  }
};

export default readFileList;
