import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
interface DeployedItem {
  id: number | string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  model?: string;
  textureImage?: string; // url to model
}

interface SceneState {
  deployedItems: DeployedItem[];
  selectedItemId: string | number | null;   // 👈 thêm field này
  transformMode: 'translate' | 'rotate' | 'scale';
}

const initialState: SceneState = {
  deployedItems: [],
  selectedItemId: null,
  transformMode: 'translate'
};

const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
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
      const { id, position, rotation, scale, textureImage } = action.payload;
      const item = state.deployedItems.find(i => i.id === id);
      if (item) {
        if (position) item.position = position;
        if (rotation) item.rotation = rotation;
        if (scale) item.scale = scale;
        if (textureImage) item.textureImage = textureImage; // 👈 thêm cập nhật texture
      }
    }
  }
});

export const {
  addDeployedItem,
  setSelectedItem,
  updateDeployedItem,
  setTransformMode
} = sceneSlice.actions;

export default sceneSlice.reducer;
