import { CardAnimalStatus } from '../../entities/ui/CardAnimal/types';

function animalStatus(status: number) {
  switch (status) {
    case CardAnimalStatus.Fundraising: {
      return 'Сбор средств';
    }
    case CardAnimalStatus.LookingForHome: {
      return 'Ищет дом';
    }
    case CardAnimalStatus.Found: {
      return 'Нашелся';
    }
    case CardAnimalStatus.Missing: {
      return 'Потерялся';
    }
    case CardAnimalStatus.Urgent: {
      return 'Срочно';
    }
    default: {
      return '';
    }
  }
}

export default animalStatus;
