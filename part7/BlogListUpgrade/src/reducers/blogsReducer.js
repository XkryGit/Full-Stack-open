import { createSlice } from '@reduxjs/toolkit';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogs } = blogsSlice.actions;

export const handleBlogs = (array) => {
  return (dispatch) => {
    dispatch(setBlogs(array));
  };
};

export default blogsSlice.reducer;
