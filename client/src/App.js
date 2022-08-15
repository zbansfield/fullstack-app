import React from 'react';
import { 
  Route, 
  Routes,
  Navigate,
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
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

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
          <Route path='/notfound' element={<NotFound/>} />
          <Route path='/forbidden' element={<Forbidden/>} />
          <Route path='/error' element={<UnhandledError/>} />

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
         <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;