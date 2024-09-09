import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  return (
    <>
      <div className="my-10">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-600">Suggested for you</h1>
          <span className="font-medium cursor-pointer">See All</span>
        </div>
        {suggestedUsers &&
          suggestedUsers.map((user) => {
            return (
              <div
                key={user?._id}
                className="flex items-center justify-between my-5"
              >
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
                    <h1 className="font-semibold text-sm">
                      <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                    </h1>
                    <span className="text-gray-600 text-sm">
                      {user?.bio || "Bio here..."}
                    </span>
                  </div>
                </div>
                <span className="text-[#39a8f3ed] text-sm font-semibold cursor-pointer hover:text-[#249eef]">
                  follow
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SuggestedUsers;
