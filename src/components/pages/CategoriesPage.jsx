import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "./CategorySideMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePostById, getPostsByCategoryId } from "../../services/post-service";
import PostCard from "../PostCard";
import { toast } from "react-toastify";

const CategoriesPage = () => {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPostsByCategoryId(categoryId)
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryId]);
  const handleDeletePost=(post) =>{
    deletePostById(post.id).then((data)=>{
       console.log(data);
       const newUserPosts=posts.filter((p)=>p.id!==post.id);
       setPosts(newUserPosts);
       toast.success(data.message);
    })
 }
  return (
    <Container className="mt-3">
      <Row>
        <Col md={2} className="border-0">
          <CategorySideMenu />
        </Col>
        <Col md={10}>
          <h2>Blogs Count {posts.length}</h2>
          {posts && posts.map((post) => <PostCard post={post} deletePost={()=>handleDeletePost(post)}/>)}
        </Col>
      </Row>
    </Container>
  );
};
export default CategoriesPage;
