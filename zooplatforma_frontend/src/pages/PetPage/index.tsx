import React from 'react';
import PageLayout from '../../widgets/PageLayout';

type PetStatus = 'fundraising' | 'lookingForHome' | 'lost';

export interface PetPageProps {
  name: string;
  city: string;
  breed: string;
  age: string;
  gender: string;
  description: string;
  images: string[];
  status: PetStatus;
}
const PetPage: React.FC<PetPageProps> = ({
  name,
  city,
  breed,
  age,
  gender,
  description,
  images,
  status,
}) => {
  return (
    <PageLayout>
      <h1>{name}</h1>
      <p>{city}</p>
      <p>{breed}</p>
      <p>{age}</p>
      <p>{gender}</p>
      <p>{description}</p>
      <img src={images[0]} alt={name} />
      <p>{status}</p>
    </PageLayout>
  );
};

export default PetPage;
