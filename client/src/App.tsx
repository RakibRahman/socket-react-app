import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SendMessage } from './components/SendMessage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-400 my-4 text-center">
      Connect Now
    </h1>
    <SendMessage/>
    </>
  )
}

export default App
