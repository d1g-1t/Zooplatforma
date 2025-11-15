export enum Gender {
  Male = 'Самец',
  Female = 'Самка',
}

type TPetData = {
  id: number;
  pet: number;
  photo: string;
  mainPhoto: boolean;
};

export type Pet = {
  name: string;
  type: string;
  gender: Gender;
  breed: string;
  color: string;
  age: string;
  location: string;
  data: TPetData[];
};
