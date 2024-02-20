import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { loginUser } from "../../services/user-service";
import { doLogin, getCurrentUserDetails } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../utils/constants";

const LoginPage = () => {
  const userData=useContext(userContext);
  const [userDetails,setUserDetails]=useState({
    email:"",
    password:""
  });
  const handleChange=(e,field) =>{
     setUserDetails((prevState)=>({...prevState,[field]:e.target.value}));
  }
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    loginUser(userDetails).then((token)=>{
        doLogin(token,()=>{
            console.log(getCurrentUserDetails());
        })
        toast.success("Loggined successfully");
        userData.setUser({data:token.user,login:true});
        navigate("/user/dashboard");
        setUserDetails({
            email:"",
            password:""
        })
    })
    .catch((error)=>{
        console.log(error);
      toast.error(error.response.data.title);
    })

  }
  const resetDetails=() =>{
    setUserDetails({
        email:"",
        password:""
    })
  }
  return (
    <Container>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse className="mt-4">
            <CardHeader>
              <h3>Login for App</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Enter Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={userDetails.email}
                    onChange={(e)=>handleChange(e,"email")}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={userDetails.password}
                    onChange={(e)=>handleChange(e,"password")}
                  ></Input>
                </FormGroup>
                <Container className="text-center">
                  <Button children="Submit" color="light" outline></Button>
                  <Button
                    children="Reset"
                    type="Reset"
                    className="ms-2"
                    color="light"
                    outline
                    onClick={resetDetails}
                  ></Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
