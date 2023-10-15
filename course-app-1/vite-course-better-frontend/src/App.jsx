import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupOrLogin from './signup_login/SignupOrLogin';
import Homepage from './Homepage';
import CreateOrEditCourse from './create_edit_course/CreateOrEditCourse';
import EditCoursePage from './create_edit_course/EditCourseDependencies';
import Courses from './courses/Courses';
import MyCourses from './courses/UserCourses';
import Appbar from './appbar/Appbar';

function App() { 
  return (
    <Router>
      <Appbar></Appbar>
      <Routes>
        {/* signup-login */}
        <Route path="/admin/signup" element={<SignupOrLogin role="admin" action="signup" />} />
        <Route path="/admin/login" element={<SignupOrLogin role="admin" action="login" />} />
        <Route path="/user/signup" element={<SignupOrLogin role="user" action="signup" />} />
        <Route path="/user/login" element={<SignupOrLogin role="user" action="login" />} />
        {/*homepage*/}
        <Route path="/" element={<Homepage />} />

        <Route path="/admin/create" element={<CreateOrEditCourse action="create" />} />
        <Route path="/admin/edit/:courseId" element={<EditCoursePage />} />

        <Route path="/admin/courses" element={<Courses role="admin" />} />
        <Route path="/user/courses" element={<Courses role="user" />} />

        <Route path="/user/myCourses" element={<MyCourses role="user" />} />

      </Routes>
    </Router>
  )
}

export default App;  