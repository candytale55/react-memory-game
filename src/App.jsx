import { useState } from 'react'
import './index.css'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>I am App</h1>
      <Form />
      <MemoryCard />
    </>
  )
}

export default App
