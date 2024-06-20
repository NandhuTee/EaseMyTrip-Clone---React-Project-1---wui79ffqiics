import { Outlet } from "react-router-dom";
//The Outlet is used to render the child routes of the current route.

function PrivateRoute() {
    // Check if there is a token stored in localStorage
    const token = localStorage.getItem('token');

    // Render the Outlet (child routes) if token exists
    /*Conditional Rendering: Uses a conditional (token && <Outlet />) 
    to render the Outlet component only if token is truthy 
    (i.e., if it exists and is not null, undefined, or an empty string).*/
    
    return (
        token && <Outlet />
    );
}

export default PrivateRoute;
