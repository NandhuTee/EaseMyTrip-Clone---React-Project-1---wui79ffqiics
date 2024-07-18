import "../styles/App.css"; // Importing the CSS file for styling
import React from "react"; // Importing React library
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importing necessary components for routing
import Home from "./Home"; // Importing the Home component
import About from "./About"; // Importing the About component

// App component
const App = () => {
  return (
    <div>   
      {/* BrowserRouter is used to enable routing in the application */}
      <BrowserRouter>
        {/* Routes component contains all the Route definitions */}
        <Routes>
          {/* Route for Home component, accessible at /home URL path */}
          <Route path="/home" element={<Home />} />
          {/* Route for About component, accessible at /about URL path */}
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>   
    </div>
  );
};

export default App; // Exporting the App component as the default export
