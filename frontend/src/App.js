import './App.css';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { Routes } from 'react-router';
import React from 'react';
import Homepage from "./Pages/Homepage";
import ViewTasks from "./Pages/ViewTasks";
function App() {
  const [ipAddress, setIPAddress] = React.useState('');
  React.useEffect(()=>{
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => setIPAddress(data.ip))
    .catch(error => console.log(error))
},[])
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/viewtasks" element={<ViewTasks ip={ipAddress}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
