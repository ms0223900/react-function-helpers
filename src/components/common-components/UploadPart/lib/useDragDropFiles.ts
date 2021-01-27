import { useCallback, useEffect, useRef, useState } from "react";

export interface UseDragDropFiles {
  onSetDropFiles?: (files: FileList) => void;
}

const stopEventDefault = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
const checkIsDragIn = (e: DragEvent) =>
  e.dataTransfer && e.dataTransfer.items.length > 0;

const useDragDropFiles = ({ onSetDropFiles }: UseDragDropFiles) => {
  const dropElRef = useRef<HTMLElement>(null);
  const dragCounter = useRef(0);
  // isDragging用於判斷是否有檔案在drag檔案的組件之中
  const [isDragging, setDrag] = useState(false);

  const handleDragIn = useCallback((e: DragEvent) => {
    stopEventDefault(e);
    dragCounter.current++;
    const isDragIn = checkIsDragIn(e);
    if (isDragIn) {
      setDrag(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    stopEventDefault(e);
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDrag(false);
    }
  }, []);

  const handleDrag = useCallback((e: DragEvent) => {
    stopEventDefault(e);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      stopEventDefault(e);
      setDrag(false);
      const isDragIn = checkIsDragIn(e);
      if (isDragIn && e.dataTransfer) {
        onSetDropFiles && onSetDropFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
        dragCounter.current = 0;
      }
    },
    [onSetDropFiles]
  );

  useEffect(() => {
    if (dropElRef.current) {
      const el = dropElRef.current;
      el.addEventListener("dragenter", handleDragIn);
      el.addEventListener("dragleave", handleDragOut);
      el.addEventListener("dragover", handleDrag);
      el.addEventListener("drop", handleDrop);

      // clear events, 清除事件監聽
      return () => {
        el.removeEventListener("dragenter", handleDragIn);
        el.removeEventListener("dragleave", handleDragOut);
        el.removeEventListener("dragover", handleDrag);
        el.removeEventListener("drop", handleDrop);
      };
    }
  }, [handleDrag, handleDragIn, handleDragOut, handleDrop]);

  return {
    dropElRef,
    isDragging
  };
};

export default useDragDropFiles;
