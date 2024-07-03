// imports the main React library for building components and managing application state
import React from "react";
//imports methods specifically for DOM interaction and rendering.
import ReactDOM from "react-dom/client";
import "./index.css";
import Routing from "./components/Routing";
import { AuthProvider } from "./components/Context";
import App from "./components/App";
/*Finds the HTML element with the id "root" in the document and 
creates a root for concurrent rendering using createRoot from ReactDOM.*/
const root = ReactDOM.createRoot(document.getElementById("root"));
//Renders the React application into the root element 
root.render(
  //ses <AuthProvider> as a wrapper around <Routing />. 
    <AuthProvider>
    <Routing />
    </AuthProvider>

);
