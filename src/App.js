import React from 'react'
import Signup from './Conponents/Signup'
import Login from './Conponents/Login'
import Expense from './Conponents/Expense'
import"./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter >

        <Routes>

          <Route path="/expense" element={<Expense />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App