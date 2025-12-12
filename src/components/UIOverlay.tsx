import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextureImage } from '../redux/sceneSlice';
import styles from '../Styles/UIOverlay.module.css';

const textureOptions = [
  { id: '/textures/multicam.jpg', label: 'Military multicam' },
  { id: '/textures/sports.jpg', label: 'Sport red' },
  { id: '/textures/luxury.jpg', label: 'Luxury yellow' }
];

const itemOptions = [
  { id: 'car', label: 'Car', model: '/models/chair.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'table', label: 'Table', model: '/models/table.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'tree', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'tree', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'tree', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'tree', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'tree', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' }
];

function UIOverlay() {
  const dispatch = useDispatch();
  const selectedTexture = useSelector((state: any) => state.scene.textureImage);

  const handleClick = (imageId: string) => {
    dispatch(setTextureImage(imageId));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚗 3D Garage Showcase</h2>

      {/* Vòng tròn chọn texture */}
      <div className={styles.textureSection}>
        <h3 className={styles.subtitle}>Select Options</h3>
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

      {/* Thư viện item */}
      <h3 className={styles.subtitle}>Add Items</h3>
      <div className={styles.itemList}>
        {itemOptions.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('model', item.model);
            }}
            className={styles.itemCard}
          >
            <img src={item.thumbnail} alt={item.label} className={styles.itemImage} />
            <p className={styles.itemLabel}>{item.label}</p>
          </div>
        ))}
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
