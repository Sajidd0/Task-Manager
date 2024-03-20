import './App.css';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { Routes } from 'react-router';
import React from 'react';
import Homepage from "./Pages/Homepage";
import ViewTasks from "./Pages/ViewTasks";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/viewtasks" element={<ViewTasks />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
