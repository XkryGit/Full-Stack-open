import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Menu from "./components/menu";
import AnecdoteList from "./components/anecdoteList";
import About from "./components/about";
import Footer from "./components/footer";
import CreateNew from "./components/createNew";
import Anecdote from "./components/anecdote";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification}
          <Routes>
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
            <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes} />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<CreateNew addNew={addNew} />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
