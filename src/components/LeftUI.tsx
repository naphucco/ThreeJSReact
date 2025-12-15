import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../Styles/LeftUI.module.css';
import ItemList from './UI/ItemList';

function LeftUI() {
  // Get all deployed items from Redux store
  const deployedItems = useSelector((state: any) => state.scene.deployedItems);
  
  // Get the ID of currently selected item
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId);
  
  // Find the actual selected item object from the deployed items array
  const selectedItem = deployedItems.find((item: any) => item.id === selectedItemId);

  /**
   * Handles drag start event for drag-and-drop functionality
   * Sets the item ID in dataTransfer for the drop target to read
   * The DataTransfer object is used to hold any data transferred between contexts, such as a drag and drop operation, or clipboard read/write.
   * 
   * @param e - React drag event
   * @param itemId - ID of the item being dragged
   */
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    // Store the item ID in the drag event data transfer
    // This allows the drop target (Scene canvas) to identify which item was dragged
    e.dataTransfer.setData('itemId', itemId);
  };

  /**
   * Handles double click event to spawn items via custom event
   * Creates and dispatches a custom 'spawnItem' event
   * 
   * @param itemId - ID of the item to spawn
   */
  const handleDoubleClick = (itemId: string) => {
    // Create a custom event with item ID in the detail
    const event = new CustomEvent('spawnItem', { 
      detail: { itemId } // Pass item ID as event data
    });
    
    // Dispatch the event to the global window object
    // Scene component listens for this event and handles item spawning
    window.dispatchEvent(event);
  };

  return (
    <div className={styles.container}>
      {/* Main header/title */}
      <h2 className={styles.title}>🚗 3D Garage Showcase</h2>

      {/* Section header for adding items */}
      <h3 className={styles.subtitle}>Add Items</h3>

      {/* ItemList component - renders draggable/spawnable items */}
      <ItemList 
        onDragStart={handleDragStart}      // Pass drag handler
        onDoubleClick={handleDoubleClick}  // Pass double click handler
      />

      {/* Statistics section - shows current scene state */}
      <p>🚀 Deployed models: {deployedItems.length}</p>
      
      {/* Conditionally render selected item info */}
      {selectedItem && (
        <p>✅ Selected: {selectedItem.type} : {selectedItem.id}</p>
      )}

      {/* User controls/instructions section */}
      <div className={styles.controls}>
        <p>• Drag: Rotate camera</p>
        <p>• Scroll: Zoom</p>
        <p>• Cube: Interactive demo</p>
      </div>
    </div>
  );
}

export default LeftUI;