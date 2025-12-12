import { createSlice } from '@reduxjs/toolkit';

const sceneSlice = createSlice({
  name: 'scene',
  initialState: {
    backgroundImage: 'image1'
  },
  reducers: {
    setBackgroundImage: (state, action) => {
      state.backgroundImage = action.payload;
    }
  }
});

export const { setBackgroundImage } = sceneSlice.actions;
export default sceneSlice.reducer;