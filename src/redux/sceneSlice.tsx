import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for items deployed in the 3D scene
interface DeployedItem {
  id: number | string;              // Unique identifier for the item
  type: string;                     // Type/category of the 3D object
  position: [number, number, number]; // 3D position [x, y, z]
  rotation: [number, number, number]; // Rotation angles [x, y, z] in radians or degrees
  scale?: number;                    // Uniform scale factor (optional)
  model?: string;                    // URL or path to 3D model file (optional)
  textureImage?: string;             // URL to texture image (optional)
  texturePatternSize?: number;       // Texture tiling/repetition size (optional)
}

// Interface for the entire scene state
interface SceneState {
  deployedItems: DeployedItem[];     // Array of all items in the scene
  selectedItemId: string | number | null; // ID of currently selected item, null if none
  transformMode: 'translate' | 'rotate' | 'scale'; // Current transformation mode
}

// Initial state when the application starts
const initialState: SceneState = {
  deployedItems: [],                // Empty scene
  selectedItemId: null,             // No item selected initially
  transformMode: 'translate'        // Default to translation mode
};

// Create Redux slice for scene management
const sceneSlice = createSlice({
  name: 'scene',                    // Name used in Redux DevTools
  initialState,                     // Starting state defined above
  reducers: {
    // Add a new item to the scene
    addDeployedItem: (state, action: PayloadAction<DeployedItem>) => {
      state.deployedItems.push(action.payload); // Append to array
    },
    
    // Set which item is currently selected (or clear selection)
    setSelectedItem: (state, action: PayloadAction<string | number | null>) => {
      state.selectedItemId = action.payload; // Update selected ID
    },
    
    // Change the current transformation mode
    setTransformMode: (state, action: PayloadAction<'translate' | 'rotate' | 'scale'>) => {
      state.transformMode = action.payload; // Update mode
    },
    
    // Update properties of an existing item
    updateDeployedItem: (state, action) => {
      const { id, position, rotation, scale, textureImage, texturePatternSize } = action.payload;
      
      // Find the item by ID
      const item = state.deployedItems.find(i => i.id === id);
      
      // If item exists, update only the provided properties
      if (item) {
        if (position) item.position = position;           // Update position if provided
        if (rotation) item.rotation = rotation;           // Update rotation if provided
        if (scale) item.scale = scale;                    // Update scale if provided
        if (textureImage) item.textureImage = textureImage; // Update texture if provided
        if (texturePatternSize) item.texturePatternSize = texturePatternSize; // Update pattern size if provided
      }
    },
    
    // Remove an item from the scene
    removeDeployedItem: (state, action: PayloadAction<string>) => {
      // Filter out the item with matching ID
      state.deployedItems = state.deployedItems.filter(
        (item) => item.id !== action.payload
      );
      
      // If the removed item was currently selected, clear the selection
      if (state.selectedItemId === action.payload) {
        state.selectedItemId = null;
      }
    }
  }
});

// Export action creators for use in React components
export const {
  addDeployedItem,
  removeDeployedItem,
  setSelectedItem,
  updateDeployedItem,
  setTransformMode
} = sceneSlice.actions;

// Export the reducer for store configuration
export default sceneSlice.reducer;