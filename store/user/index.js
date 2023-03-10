import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userInfo: null,
    isLoggedIn: false,
    isInit: false,
  },
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    updateLoggedIn: (state, action) => {
      state.isLoggedIn = action;
    },
    updateInits: (state, action) => {
      state.isInit = action;
    },

    updateUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
  },
});

export const { getUserInfo, updateLoggedIn, updateInits, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
