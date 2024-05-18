import { Outlet } from "react-router-dom";
function PrivateRoute(){
    const token = localStorage.getItem('token');
    return(
        token && <Outlet/>
    )
}
export default PrivateRoute;