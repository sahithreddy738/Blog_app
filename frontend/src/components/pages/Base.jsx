import { Outlet } from "react-router-dom";
import CustomNavBar from "../Navbar";

const BasePage = () => {
  return (
    <div className="container-fluid" style={{padding:"0px",margin:"0px"}}>
      <CustomNavBar />
      <Outlet />
    </div>
  );
};

export default BasePage;
