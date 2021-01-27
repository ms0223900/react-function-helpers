export type Callback = (args?: any) => any;

export interface ImagePreviewFile {
  name: string;
  src: string;
}

// vscode 不會報錯，此行是給codesandbox用的
export type RequestInit = any;
