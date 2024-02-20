import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../services/auth";

const UserBasePage = () => {
    return (
       (isLoggedIn())? <Outlet/>:<Navigate to="/login"/>
    );
  };
  
  export default UserBasePage;