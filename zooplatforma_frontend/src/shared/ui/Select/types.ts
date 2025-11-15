export type SelectProps = {
  label: string;
  selected: string;
  options: string[];
  onChange?: (selected: string) => void;
  error?: string;
};
