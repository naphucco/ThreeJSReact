import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Styles/LeftUI.module.css';
import { itemOptions } from '../configs/itemOptions';

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
