import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransformMode, updateDeployedItem } from '../redux/sceneSlice';
import styles from '../Styles/RightUI.module.css';

const textureOptions = [
  { id: '/textures/multicam.jpg', label: 'Military multicam' },
  { id: '/textures/sports.jpg', label: 'Sport red' },
  { id: '/textures/luxury.jpg', label: 'Luxury yellow' }
];

function RightUI() {
  const dispatch = useDispatch();
  const transformMode = useSelector((state: any) => state.scene.transformMode);
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId);

  // 👇 lấy item đang được chọn
  const selectedItem = useSelector((state: any) =>
    state.scene.deployedItems.find((i: any) => i.id === selectedItemId)
  );
  const selectedTexture = selectedItem?.textureImage; // 👈 texture của item

  const handleChangeTexture = (imageId: string) => {
    if (!selectedItemId) return;
    dispatch(updateDeployedItem({
      id: selectedItemId,
      textureImage: imageId
    }));
  };

  return (
    !selectedItemId ? null : (
      <div className={styles.containerRight}>
        <h2 className={styles.title}>🎨 Texture Options</h2>

        {/* Vòng tròn chọn texture */}
        <div className={styles.textureSection}>
          <h3 className={styles.subtitle}>Select Texture</h3>
          <div className={styles.textureList}>
            {textureOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleChangeTexture(option.id)}
                className={`${styles.textureCircle} ${
                  selectedTexture === option.id ? styles.textureCircleSelected : ''
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
    )
  );
}

export default RightUI;
