import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

export const handleUser = (array) => {
  return (dispatch) => {
    dispatch(setUser(array));
  };
};

export default usersSlice.reducer;
