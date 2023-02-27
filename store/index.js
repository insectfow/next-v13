import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from '../store/user/index';
export default configureStore({
  reducer: {
    user: userInfoSlice,
  },
});
