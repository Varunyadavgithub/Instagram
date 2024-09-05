import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const {user}=useSelector(store=>store.auth);
  return (
    <div className="fixed top-0 z-10 right-0 px-4 lg:w-[28%] md:w-[26%] h-screen hidden md:block">
      <div className="w-fit my-10 pr-32">
        <div className="flex items-center gap-2">
          <Link to={`/profile/${user?._id}`}>
            <Avatar
              src={user?.profilePicture}
              alt="profile-image"
              size="40"
              round={true}
            />
          </Link>
          <div>
            <h1 className="font-semibold text-sm"><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
            <span className="text-gray-600 text-sm">{user?.bio || "Bio here..."}</span>
          </div>
        </div>
          <SuggestedUsers/>
      </div>
    </div>
  );
};

export default RightSidebar;
