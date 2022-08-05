import React from 'react';
import { 
  Route, 
  Routes,
  BrowserRouter as Router 
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Connecting components to Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWtihContext = withContext(UserSignIn);
const UserSignUpWtihContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {

  return (
    <div className="App">
      <HeaderWithContext />

      <Router>
        <Routes>
          <Route path='/' element={<CoursesWithContext/>} />
          <Route path='/courses/:id' element={<CourseDetailWithContext/>} />
          <Route path='/signin' element={<UserSignInWtihContext/>} />
          <Route path='/signup' element={<UserSignUpWtihContext/>} />
          <Route path='/signout' element={<UserSignOutWithContext/>} />

          {/* Protected routes  */}
          <Route 
            path='/courses/create' 
            element={
              <PrivateRoute>
                <CreateCourseWithContext/>
              </PrivateRoute>
            } 
          />
          <Route 
            path='/courses/:id/update' 
            element={
              <PrivateRoute>
                <UpdateCourseWithContext/>
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;