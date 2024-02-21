import { useContext } from "react";
import { userContext } from "../../utils/constants";

const AboutPage = () => {
  const userData = useContext(userContext);
  return (
    <>
      <h1>This is About Page</h1>
      {userData.user.login && (
        <h2>
          My Name is {userData.user.data.name} and about me is{" "}
          {userData.user.data.about}
        </h2>
      )}
    </>
  );
};
export default AboutPage;
