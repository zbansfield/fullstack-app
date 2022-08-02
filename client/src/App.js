import React, { useEffect, useState } from 'react';
import { 
  Route, 
  Routes,
  BrowserRouter as Router 
} from 'react-router-dom';

import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';

import withContext from './Context';
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/courses' element={<CoursesWithContext/>}/>
          <Route path='/courses/:id' element={<CourseDetailWithContext/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;