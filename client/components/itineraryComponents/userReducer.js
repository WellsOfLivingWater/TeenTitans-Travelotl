import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logoutUser(state, action) {
      state.loggedIn = false;
      state.user = {};
    }
  },
});

export const { actions, reducer } = userSlice;
export const { loginUser, logoutUser } = actions;
export default reducer;