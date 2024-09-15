import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const Messages = ({ selectedUser }) => {
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((msg) => {
            return (
              <div
                key={msg}
                className={`flex ${
                  msg % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="max-w-xs p-2 bg-white rounded-md shadow">
                  <span>Message {msg}</span>
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
