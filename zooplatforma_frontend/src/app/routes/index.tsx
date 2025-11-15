import { createBrowserRouter } from 'react-router-dom';
import About from '../../pages/About/About';
import Ads from '../../pages/Ads/Ads';
import Agreement from '../../pages/Agreement/Agreement';
import AllServices from '../../pages/AllServices/AllServices';
import Announcement from '../../pages/announcement/';
import Authorization from '../../pages/auth';
import Curate from '../../pages/Curate/Curate';
import Curator from '../../pages/Curator/Curator';
import EditProfile from '../../pages/editProfile/editProfile';
import HotLine from '../../pages/HotLine/HotLine';
import Location from '../../pages/Location/Location';
import MainPage from '../../pages/MainPage';
import Messages from '../../pages/Messages/Messages';
import More from '../../pages/More/More';
import MyAds from '../../pages/MyAds/MyAds';
import NewPetPage from '../../pages/NewPetPage';
import Pets from '../../pages/Pets/Pets';
import Registry from '../../pages/registry/index';
import SignUp from '../../pages/signUp';
import Statistic from '../../pages/Statistic/Statistic';
import Support from '../../pages/Support/Support';
import ZooJournal from '../../pages/ZooJournal/ZooJournal';
import NewPetForm from '../../widgets/NewPetForm';
import AdvertisementForm from '../../widgets/AdvertisementForm';
import { Profile } from '../../pages/Profile/MyProfile';
import { ProfileAnimal } from '../../pages/ProfileAnimal/ProfileAnimal';
import { formData } from '../../widgets/NewPetEntryForm/mock-data';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [],
  },
  {
    path: '/newpet',
    element: <NewPetPage />,
  },
  {
    path: '/registry',
    element: <Registry />,
  },
  {
    path: '/announcement',
    element: <Announcement />,
  },
  {
    path: '/authorization',
    element: <Authorization />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },

  {
    path: '/newpet-in-registry',
    element: <NewPetForm />,
  },
  {
    path: '/edit-profile',
    element: <EditProfile />,
  },
  {
    path: '/profile-animal',
    element: <ProfileAnimal data={formData} />,
  },

  // переделать после добавление страницы профиля пользователя
  {
    path: '/ads',
    element: <Ads />,
  },
  {
    path: '/hotline',
    element: <HotLine />,
  },
  {
    path: '/zoojournal',
    element: <ZooJournal />,
  },
  {
    path: '/curate',
    element: <Curate />,
  },
  {
    path: '/my-ads',
    element: <MyAds />,
  },
  {
    path: '/messages',
    element: <Messages />,
  },
  {
    path: '/pets',
    element: <Pets />,
  },
  {
    path: '/curator',
    element: <Curator />,
  },
  {
    path: '/all-services',
    element: <AllServices />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/statistic',
    element: <Statistic />,
  },
  {
    path: '/support',
    element: <Support />,
  },
  {
    path: '/agreement',
    element: <Agreement />,
  },
  {
    path: '/more',
    element: <More />,
  },
  {
    path: '/location',
    element: <Location />,
  },
  {
    path: 'advertisement',
    element: <AdvertisementForm />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
]);

export default router;
