import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextureImage, setTransformMode } from '../redux/sceneSlice';
import styles from '../Styles/RightUI.module.css';

const textureOptions = [
  { id: '/textures/multicam.jpg', label: 'Military multicam' },
  { id: '/textures/sports.jpg', label: 'Sport red' },
  { id: '/textures/luxury.jpg', label: 'Luxury yellow' }
];

function RightUI() {
  const dispatch = useDispatch();
  const selectedTexture = useSelector((state: any) => state.scene.textureImage);
  const transformMode = useSelector((state: any) => state.scene.transformMode); // cho cách đang select (di chuyển/xoay/scale)
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId); // 👈 lấy id đang chọn

  const handleClick = (imageId: string) => {
    dispatch(setTextureImage(imageId));
  };

  return (
    !selectedItemId ? <></> :
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
                className={`${styles.textureCircle} ${selectedTexture === option.id ? styles.textureCircleSelected : ''
                  }`}
                style={{ backgroundImage: `url(${option.id})` }}
                title={option.label}
              />
            ))}
          </div>
        </div>

        {/* Chọn TransformControls mode */}
        <div className={styles.textureSection}>
          <h3 className={styles.subtitle}>Transform Mode</h3>
          <div className={styles.transformModeGroup}>
            <label>
              <input
                type="radio"
                name="mode"
                value="translate"
                checked={transformMode === 'translate'}
                onChange={() => dispatch(setTransformMode('translate'))}
              />
              <span>Move</span>
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="rotate"
                checked={transformMode === 'rotate'}
                onChange={() => dispatch(setTransformMode('rotate'))}
              />
              <span>Rotate</span>
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="scale"
                checked={transformMode === 'scale'}
                onChange={() => dispatch(setTransformMode('scale'))}
              />
              <span>Scale</span>
            </label>
          </div>
        </div>
      </div>
  );
}

export default RightUI;
