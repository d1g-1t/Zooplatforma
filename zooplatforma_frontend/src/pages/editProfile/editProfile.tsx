import s from './style.module.scss';
import Sidebar from '../../widgets/Sidebar/index.tsx';
import { EditProfileForm } from '../../widgets/EditProfileForm/index.tsx';
import { ChangePasswordForm } from '../../widgets/ChangePasswordForm/index.tsx';
import Button from '../../shared/ui/Button/index.tsx';

const EditProfile = () => {
  function onDeliteProfie() {
    // запрос на сервер на удаление профиля
  }

  return (
    <>
      <div className={s.editProfileWrapper}>
        <Sidebar favoritesCount={0} favorites={[]} />
        <div className={s.contentWrapper}>
          <EditProfileForm />
          <ChangePasswordForm />
          <div className={s.Section}>
            <div className={s.TitleSection}>
              <h3 className={s.Title}>Удалить профиль</h3>
              <p className={s.Hint}>
                Восстановление аккаунта в случае его удаления невозможно!
              </p>
            </div>
            <div className={s.buttons}>
              <Button onClick={onDeliteProfie} color="outline-red">
                Удалить мой профиль
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
