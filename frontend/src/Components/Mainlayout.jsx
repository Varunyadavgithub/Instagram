import React from "react";
import LeftSidebar from "./LeftSidebar";
import BottomSidebar from "./BottomSidebar";
// import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <>
      <LeftSidebar />
      <BottomSidebar/>
      {/* <div>
      <Outlet/>
     </div>  */}
    </>
  );
};

export default Mainlayout;
