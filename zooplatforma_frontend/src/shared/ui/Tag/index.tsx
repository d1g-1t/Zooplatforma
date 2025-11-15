import styles from './style.module.scss';

type Props = {
  text: string;
  className: string | undefined;
};

const Tag = ({ text, className }: Props) => {
  return (
    <>
      <span className={`${className} ${styles.typeOfAd}`} role="presentation">
        {text}
      </span>
    </>
  );
};

export default Tag;
