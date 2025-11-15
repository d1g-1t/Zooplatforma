import PageLayout from '../../widgets/PageLayout';
import { useAppSelector } from '../../store/store.ts';
import s from './style.module.scss';
import Gallery from '../../widgets/Gallery/index.tsx';
import { CardAnimal } from '../../entities/ui/CardAnimal/index.tsx';
import DefaultImage from '../../shared/assets/icons/image-placeholder.svg';
import DefaultIcon from '../../shared/assets/icons/icon-placeholder.svg?react';
import Button from '../../shared/ui/Button/index.tsx';
import { useNavigate } from 'react-router-dom';

export const cardsData = [
  {
    id: 8,
    title: 'Микаса',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',

    progress: 0,
  },
  {
    id: 7,
    title: 'Микас',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',

    progress: 0.25,
  },
  {
    id: 6,
    title: 'Мика',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    progress: 0.25,
  },
  {
    id: 5,
    title: 'Мик',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    progress: 0.25,
  },

  {
    id: 4,
    title: 'Ми',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    progress: 0.25,
  },
  {
    id: 3,
    title: 'Армин',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',

    progress: 0.25,
  },
  {
    id: 2,
    title: 'Арми',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    progress: 0.25,
  },
  {
    id: 1,
    title: 'Арм',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    progress: 0.25,
  },
];

export const Profile = () => {
  //const location = useLocation();
  const navigate = useNavigate();
  const formState = useAppSelector((state) => state.editProfileFormSlice);
  const userAnimals = cardsData;
  const role: string = 'User'; //user, curator брать с сервера

  //userAnimals title,image,progress,status
  //ActiveAnnouncment title,image,progress,status
  //CuratorAnnouncment title,image,progress,status
  //ComplitedAnnouncment title,image,progress,status
  //  питомцы пользователя
  return (
    <PageLayout>
      <div className={s.Wrapper}>
        <div className={s.Content}>
          <div className={s.ProfileInfo}>
            <h1 className={s.ProfileTitle}>{formState.title} </h1>
            <p className={s.ProfileDescription}>{formState.description}</p>
            <div className={s.Achievements}>
              <div className={s.AchievementsSection}>
                <p className={s.AchievementsTitle}>Пожертвования</p>
                <p className={s.AchievementsNumber}>1</p>
              </div>
              <div className={s.AchievementsSection}>
                <p className={s.AchievementsTitle}>Вылечила</p>
                <p className={s.AchievementsNumber}>25</p>
              </div>
              <div className={s.AchievementsSection}>
                <p className={s.AchievementsTitle}>Нашла дом</p>
                <p className={s.AchievementsNumber}>5</p>
              </div>
              <div className={s.AchievementsSection}>
                <p className={s.AchievementsTitle}>Нашла питомца</p>
                <p className={s.AchievementsNumber}>87</p>
              </div>
            </div>
          </div>
          <div className={s.Section}>
            <Gallery
              title="Мои питомцы"
              link=""
              linkText="Все мои объявления"
              cardsPerColumn={3}
              rowsCount={1}
            >
              {userAnimals.map((card) => {
                return (
                  <CardAnimal
                    showProgress={false}
                    size={2}
                    key={card.title}
                    // locationState={{ background: location }}
                    {...card} //переход на профиль питомца
                  />
                );
              })}
            </Gallery>
          </div>
          <div className={s.Section}>
            <Gallery
              title="Активные объявления"
              link=""
              linkText="Все объявления"
              cardsPerColumn={3}
              rowsCount={2}
            >
              {userAnimals.map((card) => {
                return (
                  <CardAnimal
                    cardStatus={1}
                    showProgress={true}
                    size={2}
                    key={card.title}
                    onClick={() => {}}
                    {...card} // переход на страницу с объявлением
                  />
                );
              })}
            </Gallery>
          </div>
          {role === 'Curator' ? (
            <div className={s.Section}>
              <Gallery
                title="Сокурирую"
                link=""
                linkText="Все сокурируемые"
                cardsPerColumn={3}
                rowsCount={2}
              >
                {userAnimals.map((card) => {
                  return (
                    <CardAnimal
                      cardStatus={1}
                      showProgress={true}
                      size={2}
                      key={card.title}
                      {...card}
                      onClick={() => {}} // переход на страницу с объявлением
                    />
                  );
                })}
              </Gallery>
            </div>
          ) : (
            ''
          )}
          <div className={s.Section}>
            <Gallery
              title="Завершенные"
              link=""
              linkText="Все завершенные"
              cardsPerColumn={3}
              rowsCount={2}
            >
              {userAnimals.map((card) => {
                return (
                  <CardAnimal
                    cardStatus={1}
                    size={2}
                    key={card.title}
                    {...card}
                    onClick={() => {}} // переход на страницу с объявлением
                  />
                );
              })}
            </Gallery>
          </div>
        </div>
        <div className={s.UserInfo}>
          <div className={s.UserInfoPhoto}>
            {formState.attachedPhoto ? (
              <img
                src={formState.attachedPhoto.url}
                alt={formState.attachedPhoto.name}
              />
            ) : (
              <img src={DefaultImage} alt="Иконка фото" />
            )}
          </div>
          <div className={s.UserInfoMain}>
            <h2 className={s.UserName}>
              {formState.firstName} {formState.lastName}
            </h2>
            <p className={s.UserStatus}>{role}</p>
            {role === 'User' ? (
              <Button
                style={{ width: '100%', marginBottom: '15px' }}
                onClick={() => {}}
              >
                Стать куратором
              </Button>
            ) : (
              ''
            )}

            <Button
              style={{ marginBottom: '30px' }}
              color={'bg-grey'}
              onClick={() => {
                navigate('/editProfile');
              }}
            >
              Редактировать
            </Button>
          </div>
          <div className={s.UserContacts}>
            <div className={s.UserContactsSection}>
              <DefaultIcon />
              <p className={s.UserContact}>{formState.address}</p>
            </div>
            {formState.hidePhone ? (
              ''
            ) : (
              <div className={s.UserContactsSection}>
                <DefaultIcon />
                <p className={s.UserContact}>{formState.phone}</p>
              </div>
            )}
            {formState.hideEmail ? (
              ''
            ) : (
              <div className={s.UserContactsSection}>
                <DefaultIcon />
                <p className={s.UserContact}>{formState.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
