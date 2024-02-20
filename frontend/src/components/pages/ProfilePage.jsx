import {  useNavigate, useParams } from "react-router-dom";
import CustomNavBar from "../Navbar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";
import ViewUserProfile from "../ViewUserProfile";
import { getUser } from "../../services/user-service";
import { useEffect, useState } from "react";
import { USER_PROFILE } from "../../utils/constants";

const ProfilePage = () => {
  // const object = useContext(userContext);
  const [user, setUser] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getUser(userId).then((data) => {
      console.log(data);
      setUser({ ...data });
    });
  }, []);

  const toggleUpdateFlag = (value) => {
    setUpdateFlag(value);
  };
  const showUpdateProfile = () => {
    toggleUpdateFlag(true);
  };
  const viewUpdateProflie = () => {
    toggleUpdateFlag(false);
  };
  /*  view user profile */
  const userView = () => {
    return (
      <ViewUserProfile updateProfileClick={showUpdateProfile} user={user} />
    );
  };

  const viewUserProfile = () => {
    return <div>{user ? userView() : "Loading user Data..."}</div>;
  };

  const updateUserProfile = () => {
    return (
      <div>
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
                alt="user_profile"
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
                  <td>BlLOGS ID</td>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <td>USER NAME</td>
                  <td>
                    <Input type="text" value={user.name} />
                  </td>
                </tr>
                <tr>
                  <td>USER EMAIL</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>ABOUT</td>
                  <td>
                    <Input type="textarea" value={user.about} />
                  </td>
                </tr>
                <tr>
                  <td>ROLE</td>
                  <td>
                    {user.roles.map((role) => {
                      return <div key={role.id}>{role.name}</div>;
                    })}
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter className="text-center">
            <Button color="success">Update Profile</Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <>
      <CustomNavBar />
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Container>
            {updateFlag ? updateUserProfile() : viewUserProfile()}
          </Container>
        </Col>
      </Row>
      <Button
        onClick={() => navigate("/user/myposts")}
        color="primary"
        className="text-center"
      >
        My Posts
      </Button>
    </>
  );
};

export default ProfilePage;
