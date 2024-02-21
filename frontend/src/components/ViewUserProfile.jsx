import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Table,
} from "reactstrap";
import { getCurrentUserDetails, isLoggedIn } from "../services/auth";
import { USER_PROFILE } from "../utils/constants";

const ViewUserProfile = ({ user, updateProfileClick }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setCurrentUser(getCurrentUserDetails());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardBody>
        <h3 className="text-uppercase">user Information</h3>

        <Container className="text-center">
          <img
            style={{ maxWidth: "200px", maxHeight: "200px" }}
            src={
              user.image
                ? user.image
                : USER_PROFILE
            }
            alt="user"
            className="img-fluid  rounded-circle"
          />
        </Container>
        <Table
          responsive
          striped
          hover
          bordered={true}
          className="text-center mt-5"
        >
          <tbody>
            <tr>
              <td>BLOGS ID</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>USER NAME</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>USER EMAIL</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>ABOUT</td>
              <td>{user.about}</td>
            </tr>
            <tr>
              <td>ROLE</td>
              <td>
                {user.roles.map((role) => {
                  return <div key={role.id}>{role.roleName}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>

        {currentUser ? (
          currentUser.id === user.id ? (
            <CardFooter className="text-center">
              <Button onClick={updateProfileClick} color="warning">
                Update Profile
              </Button>
            </CardFooter>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default ViewUserProfile;
