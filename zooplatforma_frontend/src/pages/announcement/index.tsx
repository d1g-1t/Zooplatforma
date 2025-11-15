import PageLayout from '../../widgets/PageLayout';
import Breadcrumbs from '../../shared/ui/Breadcrumbs';
import AdvertisementGallery from '../../features/Specifications/ui/AdvertisementGallery/advertisementGallery';
import { pet1 } from '../../features/Specifications/ui/AdvertisementGallery/pet1';
import styles from '../announcement/style.module.scss';
import { CardAnimalStatus } from '../../entities/ui/CardAnimal/types';
import animalStatus from '../../shared/utils/animalStatus';
import { useState } from 'react';
import Title from '../../shared/ui/Title';
import Message from '../../shared/ui/Message';
import ActionBlock from '../../shared/ui/ActionBlock';
import Curator from '../../shared/ui/Curator';
import { Specifications } from '../../features/Specifications/ui';
import Gallery from '../../widgets/Gallery';
import { cardsData } from '../MainPage/constants';
import { CardAnimal } from '../../entities/ui/CardAnimal';
import Comments from '../../widgets/Comments';
import { mockComments, mockSpecifications } from './mockConstants.ts';
import Tag from '../../shared/ui/Tag';

const Announcement = () => {
  const [status, setStatus] = useState(CardAnimalStatus.Fundraising);
  const [isFullDescription, setFullDescription] = useState(false);
  const handleShowMore = () => {
    setFullDescription(!isFullDescription);
  };
  const titleText = 'Дорогие друзья и любители животных!';
  const descriptionText =
    'Сегодня я обращаюсь к вам с сердечной просьбой о помощи. Недавно я наткнулась на беспомощного четвероногого друга, бездомную собаку, которая отчаянно нужнается. К моему ужасу, это бедное чущество сильно сломало ногу, причинив огромную боль и страдания. Как любитель животных, я не могла закрывать глаза на эту печальную ситуацию. Я не могла вынести мысли о том, что эта невинная душа lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum';

  const mockSetStatus = () => {
    if (status === 4) {
      setStatus(1);
    }
    if (status === 1) {
      setStatus(2);
    }
    if (status === 2) {
      setStatus(4);
    }
  };

  const tagClassName = () => {
    if (status === 1) return styles.fundraising;
    if (status === 2) return styles.lookingForHome;
    if (status === 4) return styles.missing;
  };
  return (
    <PageLayout>
      <section className={styles.container}>
        <div className={styles.gridHeader}>
          <Breadcrumbs
            crumbs={[
              { label: 'Главная', path: '/' },
              { label: 'Собаки', path: '/dogs' },
              { label: 'Малыш Леви', path: '/dogs/levi' },
            ]}
          />
        </div>
        <div className={`${styles.wrapper} ${styles.gridContent}`}>
          <div className={styles.containersGap}>
            <div
              className={styles.tag}
              onClick={mockSetStatus}
              role="presentation"
            >
              <Tag text={animalStatus(status)} className={tagClassName()} />
            </div>
            <AdvertisementGallery pet={pet1} />
          </div>
          <div className={styles.containersGap}>
            <div>
              <Title level={2} className={styles.title}>
                Описание
              </Title>
            </div>
            <Message
              title={titleText}
              description={descriptionText}
              isFullDescription={isFullDescription}
              handleClick={handleShowMore}
            />
          </div>
          <div className={styles.containersGap}>
            <Title level={2} className={styles.title}>
              Данные животного
            </Title>
            <Specifications specifications={mockSpecifications} />
          </div>
          <div className={styles.comments}>
            <Comments comments={mockComments} />
          </div>
        </div>
        <div className={`${styles.containersGap} ${styles.gridAds}`}>
          <div>
            <Gallery
              title={'Другие объявления куратора'}
              link={'/'}
              linkText={'Все мои объявления'}
              cardsPerColumn={4}
              rowsCount={1}
            >
              {cardsData.map((card) => {
                return <CardAnimal key={card.title} {...card} />;
              })}
            </Gallery>
          </div>
          <div>
            <Gallery
              title={'Новые объявления'}
              link={'/'}
              linkText={'Все мои объявления'}
              cardsPerColumn={4}
              rowsCount={1}
            >
              {cardsData.map((card) => {
                return <CardAnimal key={card.title} {...card} />;
              })}
            </Gallery>
          </div>
        </div>
        <div className={styles.gridActions}>
          <ActionBlock
            status={4}
            amount={50000}
            requiredAmount={25000}
            confirmedaAmount={3000}
            name={'Леви'}
            progress={0.5}
          />
          <Curator name="Екатерина Дроздова" />
        </div>
      </section>
    </PageLayout>
  );
};

export default Announcement;
