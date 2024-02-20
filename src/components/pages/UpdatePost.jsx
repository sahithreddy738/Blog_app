import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPostById,
  updatePost,
  uploadImage,
} from "../../services/post-service";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import JoditEditor from "jodit-react";
import {
  getCategoryById,
  loadAllCategories,
} from "../../services/category-service";
import CustomNavBar from "../Navbar";
import { toast } from "react-toastify";

const UpdatePostPage = () => {
  const { blogId } = useParams();
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const editor = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadAllCategories().then((data) => {
      setCategories(data);
    });
    getPostById(blogId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [blogId]);
  const handlePostChange = (e) => {
    // setPost((prevPost) => ({
    //   ...prevPost,
    //   title: e.target.value,
    // }));
    setPost({ ...post, title: e.target.value });
  };
  const handleContentChange = (e) => {
    // setPost((prevPost) => ({
    //   ...prevPost,
    //   content: e,
    // }));
    setPost({ ...post, content: e });
  };
  const handleCategoryChange = (e) => {
    getCategoryById(e.target.value)
      .then((data) => {
        // setPost((prevPost) => ({
        //   ...prevPost,
        //   category: data,
        // }));
        setPost({ ...post, category: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updatePostChange = () => {
    updatePost(post, post.id)
      .then((data) => {
        if (image) {
          uploadImage(image, post.id)
            .then((data) => {
              console.log(data);
              setPost({ ...post, imageName: data.imageName });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        console.log(data);
        toast.success("Update Success");
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleImage = (e) => {
    console.log(e);
    setImage(e.target.files[0]);
  };
  const updateHtml = () => {
    return (
      <div className="wrapper">
        <Card className="my-2">
          <CardBody>
            <h3>Update Post</h3>
            <Form onSubmit={updatePostChange}>
              <div className="my-3">
                <Label for="title">Post title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  name="title"
                  value={post.title}
                  onChange={handlePostChange}
                ></Input>
              </div>
              <div className="my-3">
                <Label for="content">Post content</Label>
                {/* <Input type="textarea" id="content" placeholder="Enter here" style={{height:"300px"}}></Input> */}
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  id="content"
                  onChange={(newContent) => handleContentChange(newContent)}
                />
              </div>
              <div className="my-3">
                <Label for="image">Select Post banner</Label>
                <Input type="file" id="image" onChange={handleImage}></Input>
              </div>
              <div className="my-3">
                <Label for="categoryId">Post Category</Label>
                <Input
                  type="select"
                  id="categoryId"
                  name="categoryId"
                  placeholder="Select Category"
                  onChange={handleCategoryChange}
                  defaultValue={0}
                >
                  <option disabled value={0}>
                    --Select Category--
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>
              <Container className="text-center">
                <Button color="primary">Update Post</Button>
                <Button
                  color="dark"
                  className="mx-1"
                  onClick={() => {
                    setPost({});
                  }}
                >
                  Reset Post
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };
  return (
    <>
      <CustomNavBar></CustomNavBar>
      <Container>{post && updateHtml()}</Container>
    </>
  );
};
export default UpdatePostPage;
