import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, updateVote } from './request'
import { useContext } from 'react';
import { NotificationContext } from './context/NotificationContext';

const App = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext);

  const updateVoteMutation = useMutation({
    mutationFn: updateVote, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      
    },
  });

  const handleVote = (updateAnecdote) => {
    updateVoteMutation.mutate({...updateAnecdote, votes: updateAnecdote.votes + 1})
    showNotification(`Anecdote "${updateAnecdote.content}" voted successfully!`);
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
