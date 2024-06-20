// Import React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom/client";

// Import global CSS styles
import "./index.css";

// Import the Routing component for navigation
import Routing from "./components/Routing";

// Import the AuthProvider component for authentication context
import { AuthProvider } from "./components/Context";

// Import the main App component (not used directly here, but might be part of Routing)
import App from "./components/App";

// Create a root element to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
    // Provide the authentication context to the entire app
    <AuthProvider>
        {/* Include the routing setup for the app */}
        <Routing />
    </AuthProvider>
);
