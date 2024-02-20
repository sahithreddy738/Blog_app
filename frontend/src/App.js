import "bootstrap/dist/css/bootstrap.min.css";
import BasePage from "./components/pages/Base";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/Home";
import SignupPage from "./components/pages/SignUp";
import LoginPage from "./components/pages/Login";
import AboutPage from "./components/pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserBasePage from "./components/pages/UserBasePage";
import DashBoardPage from "./components/pages/DashBoardPage";
import ProfilePage from "./components/pages/ProfilePage";
import PostPage from "./components/pages/PostPage";
import CategoriesPage from "./components/pages/CategoriesPage";
import UserPosts from "./components/pages/UserPosts";
import { userContext } from "./utils/constants";
import { useEffect, useState } from "react";
import { getCurrentUserDetails, isLoggedIn } from "./services/auth";
import UpdatePostPage from "./components/pages/UpdatePost";
function App() {
  const [user,setUser]=useState({
    data:{},
    login:false
  });
  useEffect(()=>{
     setUser({
       data:getCurrentUserDetails(),
       login:isLoggedIn()
     })
  },[])
  return (
    <div className="App">
      <userContext.Provider value={{user,setUser}}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<BasePage />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/post/:postId" element={<PostPage />}/>
            <Route path="/category/:categoryId" element={<CategoriesPage />} />
          </Route>
          <Route path="/user" element={<UserBasePage />}>
            <Route path="dashboard" element={<DashBoardPage />} />
            <Route path="profile-info/:userId" element={<ProfilePage />} />
            <Route path="myposts" element={<UserPosts />} />
            <Route path="update/:blogId" element={<UpdatePostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
