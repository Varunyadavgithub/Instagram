import React from "react";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Mainlayout from './Components/Mainlayout';
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import ChatPage from "./Components/ChatPage";
import MobileChat from "./Components/MobileChat"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/account/edit",
        element: <EditProfile />
      },
      {
        path: "/chat",
        element: <ChatPage />
      },
      {
        path: "/chat/:userId", // Mobile route for chat with selected user
        element: <MobileChat />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

const App = () => (
  <>
    <RouterProvider router={browserRouter} />
  </>
);

export default App;
