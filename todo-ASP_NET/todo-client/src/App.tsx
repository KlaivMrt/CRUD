import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import ActiveProjects from './components/ActiveProjects';
import ArchivedProjects from './components/ArchivedProjects';
import CompletedProjects from './components/CompletedProjects';
import './App.css';

function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
        < Route path='/' element={< Login/>}/>
        < Route path='/home' element={< Home/>}>
            < Route path='/home/active' element={< ActiveProjects/>}/>
            < Route path='/home/archived' element={< ArchivedProjects/>}/>
            < Route path='/home/completed' element={< CompletedProjects/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
