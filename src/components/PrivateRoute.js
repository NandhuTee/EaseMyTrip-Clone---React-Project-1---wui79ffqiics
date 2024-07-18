import { Outlet } from "react-router-dom"; // Importing the Outlet component from react-router-dom

// PrivateRoute component definition
function PrivateRoute() {
    // Retrieve the 'token' from the local storage
    const token = localStorage.getItem('token');
    
    // If the token exists, render the Outlet component, which represents the child routes
    return (
        token && <Outlet />
    );
}

export default PrivateRoute; // Exporting the PrivateRoute component
