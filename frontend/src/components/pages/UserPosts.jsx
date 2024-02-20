import { Col, Container, Row } from "reactstrap";
import CustomNavBar from "../Navbar";
import { useContext, useEffect, useState } from "react";
import { deletePostById, getPostsByUserId } from "../../services/post-service";
import PostCard from "../PostCard";
import { toast } from "react-toastify";
import { userContext } from "../../utils/constants";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  // const [user,setUser]=useState({});
  // const [login,setLogin]=useState(false);
  const userData=useContext(userContext);
  useEffect(() => {
    if (userData.user.login) {
      getPostsByUserId(userData.user.data.id)
        .then((data) => {
          console.log(data);
          setUserPosts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const handleDeletePost=(post) =>{
     deletePostById(post.id).then((data)=>{
        console.log(data);
        const newUserPosts=userPosts.filter((p)=>p.id!==post.id);
        setUserPosts(newUserPosts);
        toast.success(data.message);
     })
  }
  return (
    <>
      <CustomNavBar></CustomNavBar>
      <div>
        <Container>
          <Row>
            <Col md={{ size: 10, offset: 2 }}>
              {userPosts.map((post) => (
                <PostCard post={post} key={post.id} deletePost={()=>handleDeletePost(post)}/>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserPosts;
