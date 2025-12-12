import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeployedItem {
  id: number | string;
  type: string;
  position: [number, number, number];
  scale?: number;
  model?: string;
}

interface SceneState {
  textureImage: string | null;
  deployedItems: DeployedItem[];
}

const initialState: SceneState = {
  textureImage: null,
  deployedItems: []
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
    }
  }
});

export const { setTextureImage, addDeployedItem } = sceneSlice.actions;
export default sceneSlice.reducer;