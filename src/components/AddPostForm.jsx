import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { getCurrentUserDetails } from "../services/auth";
import { savePost, uploadImage } from "../services/post-service";

const AddPostForm = () => {
  const [categories, setCategories] = useState([]);
  const editor = useRef(null);
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
    userId: 0,
  });
  const [user, setUser] = useState(undefined);
  const [image,setImage]=useState(null);
  useEffect(() => {
     setUser(getCurrentUserDetails());
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        toast.error(error.response.status);
      });
  }, []);
  const handleChange = (e) => {
    setPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleContent = (value) => {
    setPost((prevState) => ({
      ...prevState,
      content: value,
    }));
  };
  const createPost = (e) => {
    e.preventDefault();
    if (post.title.trim() === '') {
        toast.error("post  title is required !!")
        return;
    }

    if (post.content.trim() === '') {
        toast.error("post content is required !!")
        return
    }

    if (post.categoryId === '') {
        toast.error("select some category !!")
        return;
    }
    savePost({ ...post, userId: user.id }).then((data) => {
      uploadImage(image,data.id).then((data)=>{
         toast.success("image uploaded");
      })
      .catch((error) =>{
        console.log(error);
      })
      toast.success("Posted Successfully " + data.id);
      setPost({
        title: "",
        content: "",
        categoryId: "",
      });
    });
  };
  const resetPost=() =>{
    setPost({
        title: "",
        content: "",
        categoryId: "",
      });
  }
  const handleImage=(e) =>{
      setImage(e.target.files[0]);
  }
  return (
    <div className="wrapper">
      <Card className="my-2">
        <CardBody>
          <h3>What's going on your mind?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                name="title"
                value={post.title}
                onChange={handleChange}
              ></Input>
            </div>
            <div className="my-3">
              <Label for="content">Post content</Label>
              {/* <Input type="textarea" id="content" placeholder="Enter here" style={{height:"300px"}}></Input> */}
              <JoditEditor
                ref={editor}
                value={post.content}
                id="content"
                onChange={handleContent}
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
                onChange={handleChange}
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
              <Button color="primary">Create Post</Button>
              <Button color="dark" className="mx-1" onClick={resetPost}>
                Reset Post
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPostForm;
