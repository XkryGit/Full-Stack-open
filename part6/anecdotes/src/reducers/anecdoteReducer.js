import { createSlice } from "@reduxjs/toolkit";
import anecdotes from "../services/anecdotes";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload.id;
      const changedAnecdote = action.payload;

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdote, addVote } = anecdoteReducer.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdotes.getAll();
    dispatch(setAnecdote(notes));
  };
};

export const new_anecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdotes.createNew(content);
    dispatch(appendAnecdote(newNote));
  };
};

export const vote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotes.update(id);
    dispatch(addVote(votedAnecdote));
  };
};

export default anecdoteReducer.reducer;
