import { Col, Container, Row } from "reactstrap";
import PostFeed from "../PostFeed";
import CategorySideMenu from "./CategorySideMenu";



const HomePage=()=>{
    return(
       <Container className="mt-3">
          <Row>
            <Col md={2} className="border-0">
               <CategorySideMenu/>
            </Col>
            <Col md={10}>
               <PostFeed/>
            </Col>
          </Row>
       </Container>
     )
}

export default HomePage;