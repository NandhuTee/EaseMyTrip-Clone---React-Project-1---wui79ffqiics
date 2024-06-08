import "../styles/App.css";
import React, { useState,useContext } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";



const App = () => {
  
  return (
    <div>   
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      </BrowserRouter>   
    </div>
  );
};

export default App;
