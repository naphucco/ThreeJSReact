import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDeployedItem, setTransformMode, updateDeployedItem } from '../redux/sceneSlice';
import styles from '../Styles/RightUI.module.css';

// Predefined texture options for the user to choose from
const textureOptions = [
  { id: '/textures/multicam.jpg', label: 'Military multicam' },
  { id: '/textures/sports.jpg', label: 'Sport red' },
  { id: '/textures/luxury.jpg', label: 'Luxury yellow' }
];

function RightUI() {
  // Redux dispatch function to send actions
  const dispatch = useDispatch();
  
  // Get current transform mode from Redux store
  const transformMode = useSelector((state: any) => state.scene.transformMode);
  
  // Get ID of currently selected item
  const selectedItemId = useSelector((state: any) => state.scene.selectedItemId);
  
  // Local state for pattern size (texture tiling/repetition)
  const [patternSize, setPatternSize] = useState<number>(1.0);
  
  // Slider range configuration
  const sliderMin = 0.1; // Minimum pattern size
  const sliderMax = 20;  // Maximum pattern size

  // Find the currently selected item from deployedItems array
  const selectedItem = useSelector((state: any) =>
    state.scene.deployedItems.find((i: any) => i.id === selectedItemId)
  );
  
  // Get current texture of selected item (if any)
  const selectedTexture = selectedItem?.textureImage;

  // Handler to change texture of selected item
  const handleChangeTexture = (imageId: string) => {
    if (!selectedItemId) return; // Exit if no item is selected
    
    // Dispatch action to update texture in Redux store
    dispatch(updateDeployedItem({
      id: selectedItemId,
      textureImage: imageId // Update texture URL
    }));
  };

  // Handler to delete selected item
  const handleDelete = () => {
    if (!selectedItemId) return; // Exit if no item is selected
    
    // Dispatch action to remove item from scene
    dispatch(removeDeployedItem(selectedItemId));
  };

  // Effect to sync local state with selected item's properties
  useEffect(() => {
    if (selectedItem) {
      // If item has texturePatternSize, use it; otherwise use default 1.0
      setPatternSize(selectedItem.texturePatternSize || 1.0);
    }
  }, [selectedItem]); // Runs when selectedItem changes

  // Calculate percentage for slider fill visualization (optional styling)
  const sliderPercent = ((patternSize - sliderMin) / (sliderMax - sliderMin)) * 100;

  // Handler for pattern size slider changes
  const handlePatternSizeChange = (value: number) => {
    // Update local state immediately for responsive slider
    setPatternSize(value);

    // Dispatch update to Redux store
    // Note: Could debounce this for performance if updates are too frequent
    if (selectedItemId) {
      dispatch(updateDeployedItem({
        id: selectedItemId,
        texturePatternSize: value // Update texture tiling size
      }));
    }
  };

  // Render nothing if no item is selected (conditional rendering)
  return (
    !selectedItemId ? null : (
      <div className={styles.containerRight}>
        {/* Header */}
        <h2 className={styles.title}>🎨 Texture Options</h2>

        {/* Texture Selection Section */}
        <div className={styles.textureSection}>
          <h3 className={styles.subtitle}>Select Texture</h3>
          <div className={styles.textureList}>
            {textureOptions.map((option) => (
              <div
                key={option.id} // Unique key for React list rendering
                onClick={() => handleChangeTexture(option.id)} // Click handler
                // Apply selected styling if this texture is currently applied
                className={`${styles.textureCircle} ${selectedTexture === option.id ? styles.textureCircleSelected : ''
                  }`}
                // Set background image to show texture preview
                style={{ backgroundImage: `url(${option.id})` }}
                title={option.label} // Tooltip on hover
              />
            ))}
          </div>
        </div>

        {/* Transform Mode Selection Section */}
        <div className={styles.textureSection}>
          <h3 className={styles.subtitle}>Transform Mode</h3>
          <div className={styles.transformModeGroup}>
            {/* Translate (Move) Mode */}
            <label>
              <input
                type="radio"
                name="mode" // Radio group name
                value="translate"
                checked={transformMode === 'translate'} // Bind to Redux state
                onChange={() => dispatch(setTransformMode('translate'))} // Update Redux
              />
              <span>Move</span> {/* Display label */}
            </label>
            
            {/* Rotate Mode */}
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
            
            {/* Scale Mode */}
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

        {/* Pattern Size (Texture Tiling) Control Section */}
        <div className={styles.textureSection}>
          <h3 className={styles.subtitle}>
            Pattern Size: <span className={styles.patternSizeValue}>{patternSize.toFixed(2)}</span>
          </h3>

          {/* Slider Container */}
          <div className={styles.sliderContainer}>
            {/* Range Input Slider */}
            <input
              type="range"
              min={sliderMin}
              max={sliderMax}
              step="0.1" // Increment/decrement step
              value={patternSize}
              onChange={(e) => handlePatternSizeChange(parseFloat(e.target.value))}
              className={styles.slider}
            />
            {/* Slider Labels */}
            <div className={styles.sliderLabels}>
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>
        </div>

        {/* Delete Button Section */}
        <div className={styles.textureSection}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            🗑 Delete Selected Item
          </button>
        </div>
      </div>
    )
  );
}

export default RightUI;