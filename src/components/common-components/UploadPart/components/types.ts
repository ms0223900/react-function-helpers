import { ChangeEvent, FormEvent, ReactNode, ReactNodeArray } from "react";
import { Callback, ImagePreviewFile } from "../lib/types";
import { DragDropFileBoxProps } from "./DragDropFileBox";

export interface UploadFormProps extends DragDropFileBoxProps {
  isUploadAvailble?: boolean;
  children?: ReactNode | ReactNodeArray;
  onSubmit: Callback;
  onChangeFiles: (e: ChangeEvent<HTMLInputElement>) => any;
}

export interface PreviewImageItemProps {
  index: number
  file: ImagePreviewFile
  previewImageProps?: React.ImgHTMLAttributes<HTMLImageElement>
  onRemoveImage?: (index: number) => Callback
}

export interface PreviewPartProps extends Pick<PreviewImageItemProps, 'previewImageProps' | 'onRemoveImage'> {
  previewImageList: ImagePreviewFile[];
}
