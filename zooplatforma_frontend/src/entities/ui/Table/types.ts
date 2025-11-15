export type TableProps = {
  headColumns: Array<string>;
  showIdColumn?: boolean;
  data: Array<Array<string>>;
  onOptionsClick: () => void;
};
