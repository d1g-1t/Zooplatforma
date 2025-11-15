import s from './style.module.scss';
import {
  newAnnouncementsTitle,
  newAnnouncementsLinkRout,
  newAnnouncementsLinkText,
  statistics,
  cardsData,
  fundraisingTitle,
  fundraisingLinkRout,
  fundraisingLinkText,
  lookingForAHomeTitle,
  lookingForAHomeLinkRout,
  lookingForAHomeLinkText,
  lostTitle,
  lostLinkRout,
  lostLinkText,
  foundTitle,
  foundLinkRout,
  foundLinkText,
  socialCardListData,
} from './constants';

import PageLayout from '../../widgets/PageLayout';
import StatisticSection from '../../widgets/StatisticSection';
import Gallery from '../../widgets/Gallery';
import { CardAnimal } from '../../entities/ui/CardAnimal';
import CardBecomeCurator from '../../widgets/CardBecomeCurator/ui';
import { SocialCardList } from '../../widgets/SocialCardList/ui';

const MainPage = () => {
  const handleCuratorClick = () => {};

  return (
    <PageLayout>
      <div className={s.mainWrapper}>
        <StatisticSection statistics={statistics}></StatisticSection>
        <hr className={`${s.line} ${s.line__with_both_m}`} />
        <Gallery
          title={newAnnouncementsTitle}
          link={newAnnouncementsLinkRout}
          linkText={newAnnouncementsLinkText}
          cardsPerColumn={4}
          rowsCount={2}
        >
          {cardsData.map((card) => {
            return <CardAnimal key={card.title} {...card} />;
          })}
        </Gallery>
        <hr className={`${s.line} ${s.line__with_both_m}`} />
        <Gallery
          title={fundraisingTitle}
          link={fundraisingLinkRout}
          linkText={fundraisingLinkText}
          cardsPerColumn={3}
        >
          {cardsData.map((card) => {
            return <CardAnimal key={card.title} {...card} />;
          })}
        </Gallery>
        <hr className={`${s.line} ${s.line__with_both_m}`} />
        <Gallery
          title={lookingForAHomeTitle}
          link={lookingForAHomeLinkRout}
          linkText={lookingForAHomeLinkText}
        >
          {cardsData.map((card) => {
            return <CardAnimal key={card.title} {...card} />;
          })}
        </Gallery>
        <hr className={`${s.line} ${s.line__with_both_m}`} />
        <Gallery title={lostTitle} link={lostLinkRout} linkText={lostLinkText}>
          {cardsData.map((card) => {
            return <CardAnimal key={card.title} {...card} />;
          })}
        </Gallery>
        <hr className={`${s.line} ${s.line__with_both_m}`} />
        <Gallery
          title={foundTitle}
          link={foundLinkRout}
          linkText={foundLinkText}
        >
          {cardsData.map((card) => {
            return <CardAnimal key={card.title} {...card} />;
          })}
        </Gallery>
        <div className={s.container}>
          <CardBecomeCurator onClick={handleCuratorClick} />
        </div>
        <SocialCardList {...socialCardListData} />
        <hr className={`${s.line} ${s.line__with_t_m}`} />
      </div>
    </PageLayout>
  );
};

export default MainPage;
