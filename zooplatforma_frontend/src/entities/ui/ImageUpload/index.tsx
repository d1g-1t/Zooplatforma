import React, { useRef } from 'react';
import styles from './style.module.scss';

export interface ImageUploadProps {
  maxPhotos?: number;
  value: { name: string; url: string }[];
  onChange: (photos: { name: string; url: string }[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxPhotos = 3,
  value,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Обработчик добавления фотографий
  const handleAddPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files)
        .slice(0, maxPhotos - value.length)
        .map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        }));
      onChange([...value, ...newPhotos]);
    }
  };

  // Обработчик удаления фотографии
  const handleDeletePhoto = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  // Открытие диалога выбора файлов
  const openFileDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      fileInputRef.current?.click();
    }
  };

  const handleKeyDownDeletePhoto = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === 'Delete') {
      const newValue = value.filter((_, i) => i !== index);
      onChange(newValue);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.previewContainer}>
        {value.length < maxPhotos && (
          <>
            <button
              onClick={openFileDialog}
              className={styles.uploadButton}
              onKeyDown={handleKeyDown}
            >
              <div className={styles.uploadButtonIconImage}></div>
              <p className={styles.uploadButtonIconText}>
                Выберите файл или перетащите его сюда
              </p>
            </button>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleAddPhotos}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
      <div className={styles.photoConteiner}>
        {value.map((photo, index) => (
          <div key={index} className={styles.photoItem}>
            <img
              src={photo.url}
              alt={`Загруженная фотография ${index + 1}`}
              className={styles.previewImage}
            />
            <button
              onClick={(event) => handleDeletePhoto(event, index)}
              className={styles.deleteButton}
              onKeyDown={(event) => handleKeyDownDeletePhoto(event, index)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
