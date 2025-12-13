import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextureImage } from '../redux/sceneSlice';
import styles from '../Styles/RightUI.module.css';

const textureOptions = [
  { id: '/textures/multicam.jpg', label: 'Military multicam' },
  { id: '/textures/sports.jpg', label: 'Sport red' },
  { id: '/textures/luxury.jpg', label: 'Luxury yellow' }
];

function RightUI() {
  const dispatch = useDispatch();
  const selectedTexture = useSelector((state: any) => state.scene.textureImage);

  const handleClick = (imageId: string) => {
    dispatch(setTextureImage(imageId));
  };

  return (
    <div className={styles.containerRight}>
      <h2 className={styles.title}>🎨 Texture Options</h2>

      {/* Vòng tròn chọn texture */}
      <div className={styles.textureSection}>
        <h3 className={styles.subtitle}>Select Texture</h3>
        <div className={styles.textureList}>
          {textureOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleClick(option.id)}
              className={`${styles.textureCircle} ${
                selectedTexture === option.id ? styles.textureCircleSelected : ''
              }`}
              style={{ backgroundImage: `url(${option.id})` }}
              title={option.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightUI;
