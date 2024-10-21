import { useDispatch } from "react-redux";
import { new_anecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  cleanNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNotification = (content) => {
    dispatch(setNotification(`You created '${content}'`));
    setTimeout(() => {
      dispatch(cleanNotification());
    }, 5000);
  };

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(new_anecdote(content));
    handleNotification(content);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
