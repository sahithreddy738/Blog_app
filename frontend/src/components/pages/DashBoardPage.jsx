import { Container } from "reactstrap";
import AddPostForm from "../AddPostForm";
import CustomNavBar from "../Navbar";


const DashBoardPage = () => {
    return (
      <>
        <CustomNavBar />
        <Container>
           <AddPostForm/>
        </Container>
      </>
    );
  };
  
  export default DashBoardPage;