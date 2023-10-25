// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminSignup from './functions/admin/adminSignup'
import UserSignup from './functions/user/userSignup'
import AdminLogin from './functions/admin/adminLogin'
import UserLogin from './functions/user/userLogin'
import AddCourse from './functions/admin/addCourse'
import InputRed from './components/inputRed'
import EditCourse from './functions/admin/editCourse'
import GetCoursesAdmin from './functions/admin/getCourses'
import GetCoursesUser from './functions/user/getCourses'
import MyCourses from './functions/user/myCourses'
import MyCoursesAdmin from './functions/admin/myCourses'
import Appbar from './components/appbar'
import Landing from './components/landing'

function App() {
  return <Router>
    <Appbar/>
    <Routes> 
      <Route path='/' element={<Landing />} />
      <Route path='/admin/signup' element={<AdminSignup />} />
      <Route path='/user/signup' element={<UserSignup />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/user/login' element={<UserLogin />} />
      <Route path='/admin/addCourse' element={<AddCourse />} />
      <Route path='/admin/editCourse/:courseId' element={<EditCourse />} />
      <Route path='/red' element={<InputRed />} />
      <Route path='/admin/courses' element={< GetCoursesAdmin />} />
      <Route path='/user/courses' element={< GetCoursesUser />} />
      <Route path='/user/myCourses' element={< MyCourses />} />
      <Route path='/admin/myCourses' element={< MyCoursesAdmin />} />
    </Routes>
  </Router>
}

export default App;
