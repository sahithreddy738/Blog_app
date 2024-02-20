import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import { deletePostById, getAllPosts } from "../services/post-service";
import PostCard from "./PostCard";
import { toast } from "react-toastify";

const PostFeed = () => {
  const [posts, setPosts] = useState({
    content: [],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    lastPage: false,
  });
  useEffect(() => {
    handlePageData(0);
  }, []);
  const handlePageData=(pageNumber=0,pageSize=5) =>{
    if(pageNumber>=posts.totalPages && posts.lastPage) {
        return;
    }
    if(pageNumber<0) {
        return;
    }
    getAllPosts(pageNumber,pageSize)
    .then((data) => {
      // console.log(data);
      setPosts(data);
    })
    .catch((error) => {
      console.log(error);
    });
  } 
  const handleDeletePost=(post) =>{
    deletePostById(post.id).then((data)=>{
       console.log(data);
       const newUserPosts=posts.content.filter((p)=>p.id!==post.id);
       setPosts({...posts,content:newUserPosts});
       toast.success(data.message);
    })
 }
  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 12}}>
          <h2>Blogs Count {posts.totalElements}</h2>
          {posts.content?.map((post) => (
            <PostCard post={post} key={post.id} deletePost={()=>handleDeletePost(post)}/>
          ))}
          <Container className="my-4">
            <Pagination size="lg">
              <PaginationItem disabled={posts.pageNumber===0} onClick={() => handlePageData(posts.pageNumber-1)}>
                <PaginationLink previous ></PaginationLink>
              </PaginationItem>
              {[...Array(posts.totalPages)].map((item, index) => (
                <>
                <PaginationItem onClick={() => handlePageData(index)} active={index === posts.pageNumber} key={index}>
                  <PaginationLink>
                     {index+1}
                  </PaginationLink>
                </PaginationItem>
                </>
              ))}
              <PaginationItem disabled={posts.lastPage} onClick={()=>handlePageData(posts.pageNumber+1)}>
                <PaginationLink last disabled={posts.lastPage}></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default PostFeed;
