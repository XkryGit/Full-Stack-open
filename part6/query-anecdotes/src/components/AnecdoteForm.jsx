import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { createAnecdote } from '../request';
import { NotificationContext } from '../context/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      showNotification('Anecdote created successfully!');
    },
    onError: (error) => {
      showNotification(`Too short anecdote, Need to have at least 5 charcters!`);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;