import useGetUserProfile from "@/hooks/useGetUserProfile";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa6";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState("posts");
  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = true;
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const displayPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <>
      <div className="flex max-w-5xl justify-center mx-auto pl-10">
        <div className="flex flex-col gap-20 p-8">
          <div className="grid grid-cols-2">
            <section className="flex items-center justify-center">
              <Avatar
                src={userProfile?.profilePicture}
                alt="profile-image"
                size="200"
                round={true}
              />
            </section>
            <section>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <span>{userProfile?.username}</span>
                  {isLoggedInUserProfile ? (
                    <>
                      <Link to="/account/edit">
                        <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-8 p-2 rounded-md font-semibold">
                          Edit profile
                        </button>
                      </Link>
                      <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-8 p-2 rounded-md font-semibold">
                        View archive
                      </button>
                      <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-8 p-2 rounded-md font-semibold">
                        Ad tools
                      </button>
                    </>
                  ) : isFollowing ? (
                    <>
                      <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-8 p-2 rounded-md font-semibold">
                        Unfollow
                      </button>
                      <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-8 p-2 rounded-md font-semibold">
                        Message
                      </button>
                    </>
                  ) : (
                    <button className="flex items-center justify-center bg-[#0095F6] hover:bg-[#3192d2] text-white h-8 p-2 rounded-md font-semibold">
                      Follow
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <p>
                    <span className="font-semibold">
                      {userProfile?.posts.length}{" "}
                    </span>
                    posts
                  </p>
                  <p>
                    <span className="font-semibold">
                      {userProfile?.followers.length}{" "}
                    </span>
                    followers
                  </p>
                  <p>
                    <span className="font-semibold">
                      {userProfile?.following.length}{" "}
                    </span>
                    following
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">
                    {userProfile?.bio || "bio here..."}
                  </span>
                  <span className="flex items-center justify-center w-fit bg-gray-200 rounded-full font-semibold text-sm p-2">
                    @{userProfile?.username}
                  </span>
                  <span>@paruluniversity</span>
                  <span>Development</span>
                  <span>Computer science</span>
                </div>
              </div>
            </section>
          </div>
          <div className="border-t border-t-gray-200">
            <div className="flex items-center justify-center gap-10 text-sm">
              <span
                className={`py-3 cursor-pointer ${
                  activeTab === "posts" ? "font-bold" : ""
                }`}
                onClick={() => handleTabChange("posts")}
              >
                POSTS
              </span>
              <span
                className={`py-3 cursor-pointer ${
                  activeTab === "saved" ? "font-bold" : ""
                }`}
                onClick={() => handleTabChange("saved")}
              >
                SAVED
              </span>
              <span
                className={`py-3 cursor-pointer ${
                  activeTab === "reels" ? "font-bold" : ""
                }`}
                onClick={() => handleTabChange("reels")}
              >
                REELS
              </span>
              <span
                className={`py-3 cursor-pointer ${
                  activeTab === "tags" ? "font-bold" : ""
                }`}
                onClick={() => handleTabChange("tags")}
              >
                TAGS
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {displayPost?.map((post) => {
                return (
                  <div
                    key={post?._id}
                    className="relative group cursor-pointer"
                  >
                    <img
                      src={post?.image}
                      alt="post-image"
                      className="w-full aspect-square object-cover rounded-sm my-2"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-white space-x-4">
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <SlHeart /> <span>{post?.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <FaRegComment /> <span>{post?.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
