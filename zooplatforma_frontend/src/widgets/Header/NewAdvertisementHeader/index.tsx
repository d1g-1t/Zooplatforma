import s from './style.module.scss';
import Button from '../../../shared/ui/Button/index';
import Title from '../../../shared/ui/Title/index';
import { HeaderProps } from './types';

const NewAdvertisementHeader = ({
  textTitle = '',
  textButtonSave = 'Сохранить',
  textButtonReset = 'Отмена',
  textButtonSubmit = 'Опубликовать',
  draftText = 'Черновик автоматически сохранен, 15.11.2023, 17:20',
}: HeaderProps) => {
  return (
    <header className={s.header}>
      <Title level={2}>{textTitle}</Title>
      <div className={s.actionsWrapper}>
        <span className={s.draftText}>{draftText}</span>
        <Button
          onClick={() => {
            console.log(textButtonReset);
          }}
          color="outline-blue"
        >
          {textButtonReset}
        </Button>
        <Button
          onClick={() => {
            console.log(textButtonSave);
          }}
          color="outline-blue"
        >
          {textButtonSave}
        </Button>
        <Button
          onClick={() => {
            console.log(textButtonSubmit);
          }}
        >
          {textButtonSubmit}
        </Button>
      </div>
    </header>
  );
};

export default NewAdvertisementHeader;
