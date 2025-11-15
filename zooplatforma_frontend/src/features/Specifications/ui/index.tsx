import { SpecificationsProps, SpecificationsEntry } from './types';
import styles from './style.module.scss';

export const Specifications = ({ specifications }: SpecificationsProps) => {
  return (
    <dl className={styles.Specifications}>
      {specifications.map((entry: SpecificationsEntry) => (
        <>
          <dt className={styles.Heading}>{entry.name}</dt>
          <dd className={styles.Contents}>{entry.value}</dd>
        </>
      ))}
    </dl>
  );
};
