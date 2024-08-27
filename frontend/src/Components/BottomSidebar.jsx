import React from "react";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { LuPlusSquare } from "react-icons/lu";
import { BiSolidMoviePlay } from "react-icons/bi";
import Avatar from "react-avatar";

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
    icon: <LuPlusSquare size={30} />,
    text: "Create",
  },
  {
    icon: <BiSolidMoviePlay size={30} />,
    text: "Reels",
  },
  {
    icon: <Avatar src="#" size="40" round={true} />,
    text: "Profile",
  },
];
const BottomSidebar = () => {
  return (
    <>
      <div className="w-full h-auto py-1 px-4 border-t border-t-[#1d1d1d] fixed bottom-0 left-0 md:hidden block">
        <div className="flex flex-row justify-between">
          {sidebarItems.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center relative p-1"
              >
                {item.icon}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomSidebar;
