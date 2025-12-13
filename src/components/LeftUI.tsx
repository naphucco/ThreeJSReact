import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Styles/LeftUI.module.css';

export const itemOptions = [
  { id: 'car', label: 'Car', modelUrl: '/models/car.glb', scale: 0.005, thumbnail: '/thumbnails/car.png' },
  { id: 'carport', label: 'Carport', modelUrl: '/models/carport1.glb', scale: 0.2, thumbnail: '/thumbnails/carport1.png' },
  { id: 'double_canopy_carport', label: 'Canopy carport', modelUrl: '/models/double_canopy_carport.glb', scale: 0.3, thumbnail: '/thumbnails/double_canopy_carport.png' },

];

function LeftUI() {
  const dispatch = useDispatch();
  const selectedTexture = useSelector((state: any) => state.scene.textureImage);
  const deployedItems = useSelector((state: any) => state.scene.deployedItems);
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId);

  const selectedItem = deployedItems.find((item: any) => item.id === selectedItemId);

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
      {selectedItem && <p>✅ Selected: {selectedItem.type} : {selectedItem.id}</p>}

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
