import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { LuPlusSquare } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if(textType === "Profile"){
      navigate(`/profile/${user?._id}`);
    } else if(textType === "Home"){
      navigate("/")
    }
  };
  const sidebarItems = [
    {
      icon: <GoHome size={30} />,
      text: "Home",
    },
    {
      icon: <IoSearchOutline size={30} />,
      text: "Search",
    },
    {
      icon: <MdOutlineExplore size={30} />,
      text: "Explore",
    },
    {
      icon: <BiMessageRoundedCheck size={30} />,
      text: "Messages",
    },
    {
      icon: <FaRegHeart size={30} />,
      text: "Notifications",
    },
    {
      icon: <LuPlusSquare size={30} />,
      text: "Create",
    },
    {
      icon: <Avatar src={user?.profilePicture} size="40" round={true} />,
      text: "Profile",
    },
    {
      icon: <AiOutlineLogout size={30} />,
      text: "Logout",
    },
  ];
  return (
    <>
      <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 lg:w-[16%] md:w-[18%] h-screen hidden md:block">
        <div className="flex flex-col">
          <h1 className="text-center md:text-2xl lg:text-3xl font-bold my-3">
            Instagram
          </h1>
          <div>
            {sidebarItems.map((item, index) => {
              return (
                <div
                  onClick={() => sidebarHandler(item.text)}
                  key={index}
                  className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
                >
                  {item.icon}
                  <span className="md:text-sm lg:text-xl font-semibold">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default LeftSidebar;
