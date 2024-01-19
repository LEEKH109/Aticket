import { useState } from 'react'
import Button from '@mui/material/Button';
import './App.css'
import theme from './util/theme';

function App() {
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
