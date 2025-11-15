export type CardWithTypeAdvertisement = {
  img: string;
  typeOfAdvertisement: OptionsForAdvertisement;
};

export enum OptionsForAdvertisement {
  LookingForHome,
  FoundOrMissing,
}
