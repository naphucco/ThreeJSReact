import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeployedItem {
  id: number | string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];  
  scale?: number;
  model?: string;
}

interface SceneState {
  textureImage: string | null;
  deployedItems: DeployedItem[];
  selectedItemId: string | number | null;   // 👈 thêm field này
  transformMode: 'translate' | 'rotate' | 'scale';
}

const initialState: SceneState = {
  textureImage: null,
  deployedItems: [],
  selectedItemId: null,
  transformMode: 'translate'
};

const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setTextureImage: (state, action: PayloadAction<string | null>) => {
      state.textureImage = action.payload;
    },
    addDeployedItem: (state, action: PayloadAction<DeployedItem>) => {
      state.deployedItems.push(action.payload);
    },
    setSelectedItem: (state, action: PayloadAction<string | number | null>) => {
      state.selectedItemId = action.payload;
    },
    setTransformMode: (state, action: PayloadAction<'translate' | 'rotate' | 'scale'>) => {
      state.transformMode = action.payload;
    },
    updateDeployedItem: (state, action) => {
      const { id, position, rotation, scale } = action.payload
      const item = state.deployedItems.find(i => i.id === id)
      if (item) {
        item.position = position
        item.rotation = rotation
        item.scale = scale
      }
    }
  }
});

export const { 
  setTextureImage, 
  addDeployedItem, 
  setSelectedItem, 
  updateDeployedItem, 
  setTransformMode 
} = sceneSlice.actions;

export default sceneSlice.reducer;
