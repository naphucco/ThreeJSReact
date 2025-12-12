import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextureImage } from '../redux/sceneSlice';
import styles from '../Styles/UIOverlay.module.css';

const textureOptions = [
  { id: '/textures/multicam.jpg', label: 'Military multicam' },
  { id: '/textures/sports.jpg', label: 'Sport red' },
  { id: '/textures/luxury.jpg', label: 'Luxury yellow' }
];

function UIOverlay() {
  const dispatch = useDispatch();
  const selectedTexture = useSelector((state: any) => state.scene.textureImage);

  const handleClick = (imageId: string) => {
    dispatch(setTextureImage(imageId));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚗 3D Car Showcase</h2>

      {/* Thông tin model */}
      <div className={styles.info}>
        <p>
          <strong>Model:</strong> Low-Poly Truck Car Drifter<br />
          <strong>Artist:</strong> Ivan Norman
        </p>
      </div>

      {/* Vòng tròn chọn texture */}
      <div className={styles.textureSection}>
        <h3 className={styles.subtitle}>Select Options</h3>
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

      {/* Hướng dẫn controls */}
      <div className={styles.controls}>
        <p>• Drag: Rotate camera</p>
        <p>• Scroll: Zoom</p>
        <p>• Cube: Interactive demo</p>
      </div>
    </div>
  );
}

export default UIOverlay;
