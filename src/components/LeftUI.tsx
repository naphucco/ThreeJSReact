import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextureImage } from '../redux/sceneSlice';
import styles from '../Styles/LeftUI.module.css';

const itemOptions = [
  { id: 'car', label: 'Car', model: '/models/chair.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'table', label: 'Table', model: '/models/table.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'table1', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'table2', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'table3', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'table4', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' },
  { id: 'table5', label: 'Tree', model: '/models/tree.glb', thumbnail: '/thumbnails/car.png' }
];

function LeftUI() {
  const dispatch = useDispatch();
  const selectedTexture = useSelector((state: any) => state.scene.textureImage);
  const deployedItems = useSelector((state: any) => state.scene.deployedItems);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚗 3D Garage Showcase</h2>

      {/* Thư viện item */}
      <h3 className={styles.subtitle}>Add Items</h3>
      <div className={styles.itemList}>
        {itemOptions.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('itemId', item.id); // handleDrop
            }}
            onDoubleClick={() => {
              const event = new CustomEvent('spawnItem', { detail: { itemId: item.id } });
              window.dispatchEvent(event);
            }}
            className={styles.itemCard}
          >
            <img src={item.thumbnail} alt={item.label} className={styles.itemImage} />
            <p className={styles.itemLabel}>{item.label}</p>
          </div>
        ))}
      </div>

      <p>🚀 Deployed models: {deployedItems.length}</p>

      {/* Hướng dẫn controls */}
      <div className={styles.controls}>
        <p>• Drag: Rotate camera</p>
        <p>• Scroll: Zoom</p>
        <p>• Cube: Interactive demo</p>
      </div>
    </div>
  );
}


export default LeftUI;
