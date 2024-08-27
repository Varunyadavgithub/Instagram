import React from "react";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Mainlayout from './Components/Mainlayout'
import Home from "./Components/Home"
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const browserRouter=createBrowserRouter([
  {
    path:"/",
    element:<Mainlayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      }
    ]
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
