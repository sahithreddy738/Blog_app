import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById, saveComment } from "../../services/post-service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { BASE_URL } from "../../utils/constants";
import {
  getCurrentUserDetails,
  isLoggedIn,
} from "../../services/auth";

const PostPage = () => {
  const [postData, setPostData] = useState(null);
  const [postComment, setPostComment] = useState({
    content: "",
  });
  const { postId } = useParams();
  useEffect(() => {
    getPostById(postId)
      .then((data) => {
        // console.log(data);
        setPostData(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  }, [postId]);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const handleChange = (e) => {
    // setPostComment((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value
    // }));
    setPostComment({ content: e.target.value });
  };
  const handlePostComment = () => {
    console.log(postComment);
    if (postComment.content.trim() === "") {
      return;
    }
    if (isLoggedIn()) {
      saveComment(postComment, getCurrentUserDetails().id, postData.id)
        .then((data) => {
          console.log(data);
          setPostData({
            ...postData,
            comments: [...postData.comments, data],
          });
          toast.success("commented successfully");
          setPostComment({
            content: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("Login first!!");
    }
  };
  return (
    <Container className="mt-4">
      <Link to="/">Home</Link> /{" "}
      {postData && <Link to="">{postData.title}</Link>}
      <Row>
        <Col md={{ size: 12 }}>
          <Card className="mt-3 ps-2 border-0 shadow-sm">
            {postData && (
              <CardBody>
                <CardText>
                  Posted by <b>{postData.user.name}</b> on{" "}
                  <b>{formatDate(postData.addedDate)}</b>
                </CardText>
                <CardText>
                  <span>{postData.category.categoryTitle}</span>
                </CardText>
                <div
                  className="divder"
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "#e2e2e2",
                  }}
                ></div>
                <CardText className="mt-2">
                  <h1>{postData.title}</h1>
                </CardText>
                <div
                  className="image-container mt-3"
                  style={{ maxWidth: "50%" }}
                >
                  <img
                    className="img-fluid"
                    src={
                      BASE_URL + "api/posts/imageResource/" + postData.imageName
                    }
                    alt=""
                  ></img>
                </div>
                <CardText
                  dangerouslySetInnerHTML={{ __html: postData.content }}
                ></CardText>
              </CardBody>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={{ size: 12 }}>
          <h3>Comments {postData ? postData.comments.length : 0}</h3>
          {postData &&
            postData.comments.map((comment) => (
              <Card className="mt-2 border-0" key={comment.id}>
                <CardBody>
                  <CardText>{comment.content}</CardText>
                </CardBody>
              </Card>
            ))}
          <Card className="mt-3 ps-2 border-0 shadow-sm">
            <CardBody>
              <Input
                type="textarea"
                placeholder="Enter your comment..."
                value={postComment.content}
                name="content"
                onChange={handleChange}
              ></Input>
              <Button className="mt-2" onClick={handlePostComment}>
                Comment
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostPage;
