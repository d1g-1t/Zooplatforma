import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

import imageIcon from '../../../shared/assets/icons/icon-image_placeholder.svg';
import trashIcon from '../../../shared/assets/icons/icon_trash.svg';
import Title from '../../../shared/ui/Title';
import { UploadFileProps } from './types';

const UploadFile: React.FC<UploadFileProps> = ({
  title,
  value,
  className,
  onChange,
}) => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Синхронизируем локальное состояние с value
  useEffect(() => {
    if (value) {
      setPreviewSrc(value.url);
    } else {
      setPreviewSrc(null);
    }
  }, [value]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0]; // Проверяем наличие файла
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      onChange?.({
        name: image.name,
        size: image.size,
        url: previewUrl,
      });
    } else {
      console.error('No file selected.');
    }
  };

  const handleDeleteImage = () => {
    onChange?.(null); // Удаляем изображение через Controller
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleContainerClick();
    }
  };

  return (
    <>
      <Title level={3}>{title}</Title>
      {value ? (
        <div className={`${styles.preview_container} ${className || ''}`}>
          <img
            src={previewSrc as string}
            alt={`Предварительный просмотр ${value?.name}`}
            className={styles.preview_image}
          />
          <button className={styles.delete_button} onClick={handleDeleteImage}>
            <img src={trashIcon} alt="Иконка удаления" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`${styles.upload_container} ${className || ''}`}
          onClick={handleContainerClick}
          onKeyDown={handleKeyDown}
          aria-label="Выберите фото"
        >
          <input
            type="file"
            id="file_upload"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            ref={fileInputRef}
            className={styles.file_input}
          />
          <label htmlFor="file_upload" className={styles.upload_label}>
            <img src={imageIcon} alt="Иконка фото" />
            <p>Выберите фото</p>
          </label>
        </button>
      )}
    </>
  );
};

export default UploadFile;
