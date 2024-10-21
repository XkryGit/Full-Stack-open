import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { handleNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector(
    (state) =>
      state.anecdotes.filter((anecdote) => anecdote.content.includes(filter)),
    (left, right) =>
      left.length === right.length &&
      left.every((value, index) => value === right[index])
  );

  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(vote(id));
    dispatch(
      handleNotification(
        `You voted for '${anecdotes.find((a) => a.id === id).content}'`,
        50
      )
    );
  };

  return (
    <>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
