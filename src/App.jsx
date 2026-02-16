import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const apiEndpoint = process.env.FINN_API; 

  console.log("api 2: ", apiEndpoint);

  return (
    <>      
      <h1>Health</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>        
      </div>
      <p className="read-the-docs">
        My personal health journey
      </p>
    </>
  )
}

export default App
