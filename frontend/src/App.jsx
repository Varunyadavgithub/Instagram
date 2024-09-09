import React from "react";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Mainlayout from './Components/Mainlayout'
import Home from "./Components/Home"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";

const browserRouter=createBrowserRouter([
  {
    path:"/",
    element:<Mainlayout/>,
    _children: [
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
      }
    ],
    get children() {
      return this._children;
    },
    set children(value) {
      this._children = value;
    },
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
])
const App = () => (
  <>
   <RouterProvider router={browserRouter}/>
  </>
);

export default App;
