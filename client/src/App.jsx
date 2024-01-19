import { useState } from 'react'
import Button from '@mui/material/Button';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Button variant="contained">Hello World</Button>
    </>
  )
}

export default App
