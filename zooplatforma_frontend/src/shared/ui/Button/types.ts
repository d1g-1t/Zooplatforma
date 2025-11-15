export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  color?:
    | 'primary'
    | 'grey-text'
    | 'accent-orange'
    | 'accent-green'
    | 'attention'
    | 'outline-blue'
    | 'outline-red'
    | 'none-border'
    | 'bg-grey';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}
