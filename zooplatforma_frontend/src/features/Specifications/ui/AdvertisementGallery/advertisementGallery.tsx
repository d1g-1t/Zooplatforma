import Title from '../../../../shared/ui/Title';
import styles from './style.module.scss';
import { Pet } from './types.ts';
import React, { useState } from 'react';
import DefaultImage from '../../../../shared/assets/icons/image-placeholder.svg';
import Modal from '../../../../shared/ui/Modal/index.tsx';
import Slider from '../../../../shared/ui/Slider/index.tsx';
import { CardAnimal } from '../../../../entities/ui/CardAnimal/index.tsx';
import {
  CardAnimalSize,
  CardAnimalStatus,
} from '../../../../entities/ui/CardAnimal/types.ts';
interface AdvertisementGalleryProps {
  pet: Pet;
}

const AdvertisementGallery: React.FC<AdvertisementGalleryProps> = ({ pet }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [allPhotoes, setAllPhotoes] = useState(false);

  const handleShowAllPhotoes = () => {
    setAllPhotoes(!allPhotoes);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === ' ') {
      return;
    }
    return;
  };

  return (
    <div className={styles.container}>
      <section className={styles.headerContainer}>
        <div>
          <Title className={styles.title} level={2}>
            {pet.name}
          </Title>
          <p>{`${pet.location} ${pet.type}, ${pet.gender}, ${pet.breed}, ${pet.age}`}</p>
        </div>
        <div className={styles.iconsContainer}>
          <button
            className={styles.buttonIcon}
            onClick={() => {
              console.log('Click on flag');
            }}
          >
            <svg
              width="15"
              height="19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.019 2.045c-1.009-.33-2.465-.526-4.24.054-2.13.695-3.924.7-5.202.522a9.378 9.378 0 0 1-.812-.15v8.663c.263.118.65.265 1.142.38 1.02.238 2.505.341 4.314-.25 2.162-.706 3.986-.593 5.281-.29.268.062.513.132.733.205V2.595a5.992 5.992 0 0 0-1.216-.55zm1.537.765zm.562-.667.564-.664a.857.857 0 0 1 .318.664v10.374c0 .318-.18.611-.466.762a.898.898 0 0 1-.902-.04l-.004-.003.49-.72-.49.72h.002v.002h.002l-.01-.005a4.097 4.097 0 0 0-.354-.182 6.27 6.27 0 0 0-1.175-.396c-1.02-.238-2.505-.341-4.314.25-2.162.706-3.986.593-5.281.29a8.507 8.507 0 0 1-.733-.205v5.146A.874.874 0 0 1 .882 19 .874.874 0 0 1 0 18.136V1.279C0 .979.158.7.418.543a.898.898 0 0 1 .854-.04l.01.005.063.027c.061.025.16.063.292.106a6.97 6.97 0 0 0 1.19.268c1.039.146 2.553.15 4.394-.45 2.195-.717 4.048-.481 5.356-.054.65.212 1.163.47 1.519.68a5.945 5.945 0 0 1 .568.379l.011.01.004.003h.002v.002c.001 0 .002 0-.563.664z"
                fill="#A1A8B2"
              />
            </svg>
          </button>
          <button
            className={styles.buttonIcon}
            onClick={() => {
              console.log('Click on share');
            }}
          >
            <svg
              width="16"
              height="19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.451 13.897.433.241.392-.303c.44-.34.944-.533 1.511-.533a2.465 2.465 0 0 1 2.463 2.463 2.47 2.47 0 0 1-2.463 2.485 2.47 2.47 0 0 1-2.463-2.485c0-.28.063-.583.172-.895l.21-.596-.553-.307-4.498-2.502-.455-.253-.396.337a2.46 2.46 0 0 1-1.591.598A2.47 2.47 0 0 1 .75 9.662a2.47 2.47 0 0 1 2.463-2.485c.6 0 1.158.228 1.591.597l.398.34.456-.257 4.605-2.588.634-.356-.337-.645a2.227 2.227 0 0 1-.236-1.033A2.47 2.47 0 0 1 12.787.75a2.47 2.47 0 0 1 2.463 2.485 2.47 2.47 0 0 1-2.463 2.485c-.49 0-.948-.148-1.323-.395l-.382-.25-.397.223-4.798 2.696-.539.303.194.587c.085.256.134.522.134.8 0 .253-.048.518-.134.777l-.195.589.542.302 4.562 2.545z"
                stroke="#A1A8B2"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <button
            className={styles.buttonIcon}
            onClick={() => {
              console.log('Click on notification');
            }}
          >
            <svg
              width="20"
              height="21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.244 12.62h-.002l-.586-.52a.782.782 0 0 1-.215-.287.972.972 0 0 1-.058-.373V8.339c0-1.803-.739-3.554-1.927-4.942C14.1 1.79 12.24.9 10.187.9h-.01c-.05 0-.104 0-.16.018C9.945.9 9.877.9 9.837.9h-.002c-2.05 0-3.935.89-5.27 2.497-1.21 1.389-1.95 3.14-1.95 4.942v3.077a.974.974 0 0 1-.057.366.784.784 0 0 1-.215.293l-.587.52-.001.002A2.639 2.639 0 0 0 .9 14.49v.003c0 .735.268 1.424.78 1.941.49.493 1.15.764 1.858.764H16.485c.707 0 1.367-.271 1.856-.764a2.59 2.59 0 0 0 .758-1.92l-.1.003.1-.003a2.64 2.64 0 0 0-.855-1.893zM2.849 13.815l.003-.003.588-.521.002-.003c.538-.517.783-1.135.783-1.871V8.339c0-3.656 2.933-5.819 5.61-5.819h.01c.048 0 .101 0 .155-.016.025.007.05.01.072.013.034.003.067.003.09.003h.002c2.677 0 5.61 2.163 5.61 5.819v3.077c0 .735.244 1.355.784 1.85h.001l.587.52c.213.194.32.45.32.731 0 .281-.108.542-.304.762a.924.924 0 0 1-.701.298H3.538a.924.924 0 0 1-.7-.297l-.005-.005a1.088 1.088 0 0 1-.3-.758c0-.282.108-.535.316-.703z"
                fill="#A1A8B2"
                stroke="#A1A8B2"
                strokeWidth=".2"
              />
              <path
                d="M11.662 16.804c0 .916-.754 1.675-1.662 1.675-.907 0-1.662-.759-1.662-1.675 0-.457-.35-.81-.805-.81a.795.795 0 0 0-.805.81C6.728 18.61 8.206 20.1 10 20.1c1.795 0 3.272-1.49 3.272-3.296 0-.457-.35-.81-.805-.81a.795.795 0 0 0-.805.81z"
                fill="#A1A8B2"
                stroke="#A1A8B2"
                strokeWidth=".2"
              />
            </svg>
          </button>
        </div>
      </section>
      {pet.data.length ? (
        <section className={styles.gallery}>
          <img
            className={`${styles.gallery__imageLarge}`}
            src={
              pet.data[currentImage].mainPhoto
                ? pet.data[currentImage].photo
                : pet.data[currentImage].photo
            }
            alt={`Фото ${pet.name}`}
          />
          {pet.data.length !== 1 && (
            <ul className={styles.gallery__thumbnails}>
              {allPhotoes === true ? (
                <Modal
                  isOpen={allPhotoes}
                  onClose={() => {
                    setAllPhotoes(false);
                  }}
                >
                  <Slider
                    title={pet.name}
                    similarLink={'/announcement'}
                    currentWidth="60vw"
                  >
                    {pet.data.map((photo) => {
                      return (
                        <CardAnimal
                          key={photo.id}
                          id={photo.id}
                          title={''}
                          image={photo.photo}
                          size={CardAnimalSize.Big}
                          cardStatus={CardAnimalStatus.None}
                          showUrgent={false}
                        />
                      );
                    })}
                  </Slider>
                </Modal>
              ) : (
                pet.data
                  .filter((_, index) => index < 4)
                  .map((photo, index, arr) => {
                    return (
                      <li key={index}>
                        <div
                          onClick={() => setCurrentImage(index)}
                          role={'button'}
                          tabIndex={index}
                          onKeyDown={handleKeyDown}
                        >
                          <img
                            className={styles.gallery__image}
                            src={photo.photo}
                            alt={`Фото ${pet.name}`}
                            key={index}
                          />
                        </div>
                        {arr.length - 1 === index && (
                          <div
                            className={styles.allPhotoes}
                            onClick={handleShowAllPhotoes}
                            onKeyDown={handleKeyDown}
                            role={'presentation'}
                          >
                            <p>Все фото</p>
                            <p>({pet.data.length})</p>
                          </div>
                        )}
                      </li>
                    );
                  })
              )}
            </ul>
          )}
        </section>
      ) : (
        <img
          src={DefaultImage}
          className={styles.emptyImage}
          alt="Пустое фото"
        />
      )}
    </div>
  );
};

export default AdvertisementGallery;
