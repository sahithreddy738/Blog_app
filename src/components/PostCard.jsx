import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Container } from "reactstrap";
// import { getCurrentUserDetails, isLoggedIn } from "../services/auth";
import { userContext } from "../utils/constants";
// import HtmlToText from "../utils/converter";

const PostCard = ({
  post = { title: "This is default title", content: "This is default content" },
  deletePost
}) => {
  const userData=useContext(userContext);
  const navigate = useNavigate();
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   setUser(getCurrentUserDetails());
  // }, []);
  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h2>{post.title}</h2>
        {/* <HtmlToText htmlContent={post.content.substring(0,100)} /> */}
        <Container>
          <Button
            onClick={() => {
              navigate(`/post/${post.id}`);
            }}
          >
            Read Post
          </Button>
          {userData.user.login && userData.user.data.id === post.user?.id ? (
            <Button color="danger" className="mx-3" onClick={deletePost}>Delete</Button>
          ) : (
            ""
          )}
            {userData.user.login && userData.user.data.id === post.user?.id ? (
            <Button color="warning" className="mx-3" onClick={()=>{
               navigate(`/user/update/${post.id}`);
            }}>Update</Button>
          ) : (
            ""
          )}
        </Container>
      </CardBody>
    </Card>
  );
};
export default PostCard;
