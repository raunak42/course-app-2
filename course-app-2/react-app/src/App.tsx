// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminSignup from './functions/adminSignup'

function App() {
  return <Router>
    <Routes>
      <Route path='/admin/signup' element={<AdminSignup />} />
    </Routes>
  </Router>
}

export default App
