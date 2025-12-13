import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../Styles/LeftUI.module.css';
import ItemList from './UI/ItemList';

function LeftUI() {
  const deployedItems = useSelector((state: any) => state.scene.deployedItems);
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId);
  const selectedItem = deployedItems.find((item: any) => item.id === selectedItemId);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('itemId', itemId);
  };

  const handleDoubleClick = (itemId: string) => {
    const event = new CustomEvent('spawnItem', { detail: { itemId } });
    window.dispatchEvent(event);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚗 3D Garage Showcase</h2>

      <h3 className={styles.subtitle}>Add Items</h3>

      <ItemList 
        onDragStart={handleDragStart}
        onDoubleClick={handleDoubleClick}
      />

      <p>🚀 Deployed models: {deployedItems.length}</p>
      {selectedItem && <p>✅ Selected: {selectedItem.type} : {selectedItem.id}</p>}

      <div className={styles.controls}>
        <p>• Drag: Rotate camera</p>
        <p>• Scroll: Zoom</p>
        <p>• Cube: Interactive demo</p>
      </div>
    </div>
  );
}

export default LeftUI;