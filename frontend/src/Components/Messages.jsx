import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";
import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <div className="overflow-y-auto flex-1 p-4 bg-gray-50">
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center justify-center">
            <Avatar
              src={selectedUser?.profilePicture}
              alt="profile-image"
              size="40"
              round={true}
            />
            <span className="mt-2 font-semibold">{selectedUser?.username}</span>
            <Link to={`/profile/${selectedUser?._id}`}>
              <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md font-semibold my-2">
                View profile
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {messages &&
            messages.map((msg, idx) => {
              return (
                <div
                  key={idx}
                  className={`flex ${
                    msg?.senderId === user?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-md shadow ${
                      msg?.senderId === user?._id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <span>{msg.message}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Messages;
