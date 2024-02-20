import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
import { doLogout } from "../services/auth";
import { userContext } from "../utils/constants";

const CustomNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [login, setLogin] = useState(false);
  // const [user, setUser] = useState(undefined);
  const userData=useContext(userContext);

  // useEffect(() => {
  //   setLogin(isLoggedIn());
  //   setUser(getCurrentUserDetails());
  // }, [login]);

  const handleLogout = () => {
    doLogout(() => {
      userData.setUser({data:{},login:false});
      // setLogin(false);
    });
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="" className="px-5">
        <NavbarBrand tag={ReactLink} to={"/"}>
          MyBlogs
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to={"/"}>
                News Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to={"/about"}>
                About
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem>LinkedIn</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            { !userData.user.login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to={"/login"}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to={"/signup"}>
                    SignUp
                  </NavLink>
                </NavItem>
              </>
            )}
            {userData.user.login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile-info/${userData.user.data.id}`}>
                    profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to={"/user/dashboard"}>
                    {userData.user.data.email}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={handleLogout} tag={ReactLink} to={"/login"}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavBar;
