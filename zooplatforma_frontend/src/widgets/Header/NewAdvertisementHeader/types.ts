export interface HeaderProps {
  onSearch?: (query: string) => void;
  onCreateClick?: () => void;
  textTitle: string;
  textButtonSubmit: string;
  textButtonSave: string;
  textButtonReset: string;
  draftText: string;
}
