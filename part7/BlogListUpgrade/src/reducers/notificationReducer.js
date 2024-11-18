import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    cleanNotification() {
      return null;
    },
  },
});

export const { setNotification, cleanNotification } = notificationSlice.actions;

export const handleNotification = (text, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(cleanNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
