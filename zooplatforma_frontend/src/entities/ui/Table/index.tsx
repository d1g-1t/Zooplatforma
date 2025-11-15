import { TableProps } from './types';
import { OptionsButton } from './OptionsButton';
import styles from './styles.module.scss';

export const Table = ({
  headColumns,
  showIdColumn,
  data,
  onOptionsClick,
}: TableProps) => {
  return (
    <table className={styles.Table}>
      <thead className={styles.Head}>
        <tr className={styles.HeadRow}>
          {showIdColumn && (
            <th
              className={`${styles.HeadItem} ${styles.HeadItemIndex}`}
              scope="col"
            >
              #
            </th>
          )}
          {headColumns.map((col: string, index: number, array: string[]) =>
            index + 1 == array.length ? (
              <th
                scope="col"
                className={`${styles.HeadItem} ${styles.HeadItemLast}`}
              >
                <div className={styles.HeadItemOptions}>
                  {col}
                  <OptionsButton onClick={onOptionsClick} />
                </div>
              </th>
            ) : (
              <th scope="col" className={styles.HeadItem}>
                {col}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className={styles.Body}>
        {data.map((row: Array<string>, index: number) => (
          <tr className={styles.BodyRow}>
            {showIdColumn && (
              <td
                className={`${styles.BodyItemIndex} ${index % 2 == 0 ? styles.BodyItemEven : styles.BodyItemOdd}`}
              >
                {index + 1}
              </td>
            )}
            {row.map((str: string) => (
              <td
                className={`${styles.BodyItem} ${index % 2 == 0 ? styles.BodyItemEven : styles.BodyItemOdd}`}
              >
                {str}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
