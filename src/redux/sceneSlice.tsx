import { createSlice } from '@reduxjs/toolkit';

const sceneSlice = createSlice({
  name: 'scene',
  initialState: {
    textureImage: null
  },
  reducers: {
    setTextureImage: (state, action) => {
      state.textureImage = action.payload;
    }
  }
});

export const { setTextureImage } = sceneSlice.actions;
export default sceneSlice.reducer;