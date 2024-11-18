import { configureStore } from '@reduxjs/toolkit';
import notification from './reducers/notificationReducer';
import blogs from './reducers/blogsReducer';
import user from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notification,
    blogs: blogs,
    user: user,
  },
});

export default store;
