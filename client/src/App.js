import React, { useEffect, useState } from 'react';
import { 
  Route, 
  Routes,
  BrowserRouter as Router 
} from 'react-router-dom';

import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Courses/>}/>
          <Route path='/courses/:id' element={<CourseDetail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;