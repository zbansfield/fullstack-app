import React, { useEffect, useState } from 'react';
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
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWtihContext = withContext(UserSignIn);
const UserSignUpWtihContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {

  return (
    <div className="App">
      <Header/>

      <Router>
        <Routes>
          <Route path='/' element={<CoursesWithContext/>}/>
          <Route path='/courses/:id' element={<CourseDetailWithContext/>} />
          <Route path='/signin' element={<UserSignInWtihContext/>}/>
          <Route path='/signup' element={<UserSignUpWtihContext/>} />
          <Route path='/courses/create' element={<CreateCourseWithContext/>} />
          <Route path='/courses/:id/update' element={<UpdateCourseWithContext/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;