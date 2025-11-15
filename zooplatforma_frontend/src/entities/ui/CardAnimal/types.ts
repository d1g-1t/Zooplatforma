export enum CardAnimalStatus {
  None,
  Fundraising,
  LookingForHome,
  Found,
  Missing,
  Urgent,
}

export enum CardAnimalSize {
  Small,
  Big,
  SmallForProfile,
}

export type CardAnimalProps = {
  title: string;
  image?: string;
  size?: CardAnimalSize;
  cardStatus?: CardAnimalStatus;
  progress?: number;
  showProgress?: boolean;
  showUrgent?: boolean;
  onClick?: () => void;
  id: number;
  locationState?: string;
};
