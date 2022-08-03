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
import UserSignOut from './components/UserSignOut';

import withContext from './Context';
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWtihContext = withContext(UserSignIn);
const UserSignUpWtihContext = withContext(UserSignUp);


function App() {

  return (
    <div className="App">
      <Header/>

      <Router>
        <Routes>
          <Route path='/courses' element={<CoursesWithContext/>}/>
          <Route path='/courses/:id' element={<CourseDetailWithContext/>} />
          <Route path='/sign-in' element={<UserSignInWtihContext/>}/>
          <Route path='/sign-up' element={<UserSignUpWtihContext/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;