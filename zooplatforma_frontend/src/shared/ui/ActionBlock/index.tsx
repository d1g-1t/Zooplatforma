import { ProgressBar } from '../../../entities/ui/CardAnimal/ProgressBar';
import { formatter } from '../../utils/formatter';
import Button from '../Button';
import Title from '../Title';
import styles from './style.module.scss';

type Props = {
  status: number;
  amount?: number;
  requiredAmount?: number;
  confirmedaAmount?: number;
  name: string;
  progress?: number;
};

const ActionBlock = ({
  status,
  amount,
  requiredAmount,
  confirmedaAmount,
  name,
  progress,
}: Props) => {
  if (status === 1) {
    return (
      <div className={styles.container}>
        <div className={styles.containerAmount}>
          <Title level={2}>{amount && formatter(amount)}</Title>
          <Title level={3}>
            Необходимо: {requiredAmount && formatter(requiredAmount)}
          </Title>
          <div className={styles.containerProgressBar}>
            <ProgressBar
              className={styles.progress}
              classNameFill={styles.progressFill}
              progress={progress}
            />
          </div>
          <div className={styles.containerAmount}>
            <Title level={2}>
              {confirmedaAmount && formatter(confirmedaAmount)}
            </Title>
            <Title level={3}>Подтвержденные расходы</Title>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={() => {
              console.log('button Click');
            }}
            color="outline-red"
            className={styles.actionButton}
          >
            Забрать домой
          </Button>
          <Button
            onClick={() => {
              console.log('button Click');
            }}
            color="attention"
            className={styles.actionButton}
          >
            Пожертвовать
          </Button>
        </div>
      </div>
    );
  }
  if (status === 2) {
    return (
      <div className={styles.container}>
        <p>
          Готовы забрать <span className={styles.bold}>{name}</span> домой?
          <p>Отправьте заявку его куратору</p>
        </p>
        <Button
          onClick={() => {
            console.log('button Click');
          }}
          color="accent-green"
        >
          Забрать домой
        </Button>
      </div>
    );
  }
  if (status === 4) {
    return (
      <div className={styles.container}>
        <p>
          Если вы обладаете какой-либо информацией о{' '}
          <span className={styles.bold}>{name}</span>, сообщите нам
        </p>
        <Button
          onClick={() => {
            console.log('button Click');
          }}
          color="accent-orange"
        >
          Забрать домой
        </Button>
      </div>
    );
  }

  return;
};

export default ActionBlock;
