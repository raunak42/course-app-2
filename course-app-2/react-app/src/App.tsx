// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminSignup from './functions/admin/adminSignup'
import UserSignup from './functions/user/userSignup'
import AdminLogin from './functions/admin/adminLogin'
import UserLogin from './functions/user/userLogin'
import AddCourse from './functions/admin/addCourse'
import InputRed from './components/inputRed'

function App() {
  return <Router>
    <Routes>
      <Route path='/admin/signup' element={<AdminSignup />} />
      <Route path='/user/signup' element={<UserSignup />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/user/login' element={<UserLogin />} />
      <Route path='/admin/addCourse' element={<AddCourse />} />
      <Route path='/red' element={<InputRed />} />
    </Routes>
  </Router>
}

export default App
