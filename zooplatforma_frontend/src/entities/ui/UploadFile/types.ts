export interface UploadFileData {
  size: number;
  name: string;
  url: string;
}

export interface UploadFileProps {
  title?: string;
  value?: UploadFileData | null;
  className?: string;
  onChange?: (file: UploadFileData | null) => void;
}
