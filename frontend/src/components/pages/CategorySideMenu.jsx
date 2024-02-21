import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "../../services/category-service";
import { toast } from "react-toastify";

const CategorySideMenu = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        toast.error(error.response.status);
      });
  }, []);
  return (
    <div>
      <ListGroup>
        <ListGroupItem action={true} tag={Link} to="/" className="border-2">
          All Blogs
        </ListGroupItem>
        {categories &&
          categories.map((category) => (
            <ListGroupItem
              className="border-2"
              onClick={() => {
                navigate(`/category/${category.id}`);
              }}
              style={{cursor:"true"}}
            >
              {category.categoryTitle}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
};

export default CategorySideMenu; 
