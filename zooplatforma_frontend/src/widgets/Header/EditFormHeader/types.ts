export interface HeaderProps {
  onSearch?: (query: string) => void;
  onCreateClick?: () => void;
  onSubmit?: () => void;
  onReset?: () => void;
  textTitle: string;
  textButtonSave: string;
  textButtonReset: string;
}
