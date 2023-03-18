import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import PageNotFound from './pages/PageNotFound';
import Repositories from './pages/Repositories';
import Success from './pages/Success';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route
          path="/repos/:user"
          element={<Repositories />}
        ></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
