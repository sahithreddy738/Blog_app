import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { registerUser } from "../../services/user-service";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
  });
  const handleChange = (e, property) => {
    setFormData((prevState) => ({ ...prevState, [property]: e.target.value }));
  };
  const resetData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };
  const submitData = (e) => {
    e.preventDefault();
    registerUser(formData)
      .then((data) => {
        console.log(data);
        toast("User registration successful with " + data.id);
        setFormData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setError({ errors: error });
      });
  };
  return (
    <Container>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="secondary" inverse className="mt-4">
            <CardHeader>
              <h3>Sign-Up for App</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitData}>
                <FormGroup>
                  <Label for="name">Enter Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter Username"
                    onChange={(e) => handleChange(e, "name")}
                    value={formData.name}
                    invalid={error.errors?.response?.data?.name ? true : false}
                  ></Input>
                  <FormFeedback>
                     {error.errors?.response?.data?.name}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Enter Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    onChange={(e) => handleChange(e, "email")}
                    value={formData.email}
                    invalid={error.errors?.response?.data?.email ? true : false}
                  ></Input>
                   <FormFeedback>
                     {error.errors?.response?.data?.email}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={(e) => handleChange(e, "password")}
                    value={formData.password}
                    invalid={
                      error.errors?.response?.data?.password ? true : false
                    }
                  ></Input>
                   <FormFeedback>
                     {error.errors?.response?.data?.password}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="about">Enter about yourself</Label>
                  <Input
                    type="textarea"
                    id="about"
                    placeholder="Enter about yourself"
                    onChange={(e) => handleChange(e, "about")}
                    value={formData.about}
                    invalid={error.errors?.response?.data?.about ? true : false}
                  ></Input>
                   <FormFeedback>
                     {error.errors?.response?.data?.about}
                  </FormFeedback>
                </FormGroup>
                <Container className="text-center">
                  <Button children="Submit" color="light" outline></Button>
                  <Button
                    children="Reset"
                    className="ms-2"
                    color="light"
                    outline
                    onClick={resetData}
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
export default SignupPage;
