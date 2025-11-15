import s from './style.module.scss';
import Button from '../../../shared/ui/Button/index';
import Title from '../../../shared/ui/Title/index';
import { HeaderProps } from './types';

const EditFormHeader = ({
  textTitle = '',
  textButtonSave = 'Сохранить',
  textButtonReset = 'Отмена',
  onSubmit,
  onReset,
}: HeaderProps) => {
  return (
    <header className={s.header}>
      <Title level={2}>{textTitle}</Title>
      <div className={s.actionsWrapper}>
        <Button onClick={onReset ? onReset : () => {}} color="outline-blue">
          {textButtonReset}
        </Button>
        <Button onClick={onSubmit ? onSubmit : () => {}}>
          {textButtonSave}
        </Button>
      </div>
    </header>
  );
};

export default EditFormHeader;
