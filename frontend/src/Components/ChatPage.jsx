import { setSelectedUser } from "@/redux/authSlice";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { TbMessageCircleCode } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import Messages from "./Messages";

const ChatPage = () => {
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const isOnline = true;
  const dispatch = useDispatch();

  // State to manage mobile view
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Function to handle user selection
  const handleUserClick = (suggestedUser) => {
    dispatch(setSelectedUser(suggestedUser));
    // If on mobile, open the chat view
    if (window.innerWidth < 768) {
      setIsMobileChatOpen(true);
    }
  };

  // Function to handle back action on mobile chat
  const handleBack = () => {
    setIsMobileChatOpen(false);
    dispatch(setSelectedUser(null));
  };

  return (
    <>
      <div className="flex md:ml-[16%] h-screen">
        {/* User List  Section */}
        <section
          className={`w-full md:w-1/4 my-8 ${
            isMobileChatOpen ? "hidden" : "block"
          }`}
        >
          <div className="sticky top-0">
            <h1 className="font-bold mb-4 px-3">{user?.username}</h1>
            <hr className="mb-4 border-gray-300" />
          </div>
          <div className="overflow-y-auto h-[calc(100vh-100px)]">
            {suggestedUsers.map((suggestedUser) => {
              return (
                <div
                  key={suggestedUser?._id}
                  onClick={() => handleUserClick(suggestedUser)}
                  className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <Avatar
                    src={suggestedUser?.profilePicture}
                    alt="profile-image"
                    size="40"
                    round={true}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {suggestedUser.username}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isOnline ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isOnline ? "online" : "offline"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Chat Section */}
        {selectedUser && (
          <section
            className={`flex-1 border-l border-gray-300 flex flex-col h-full ${
              isMobileChatOpen
                ? "absolute top-0 left-0 w-full z-20 bg-white"
                : ""
            }`}
          >
            {/* Mobile Back Button */}
            {isMobileChatOpen && (
              <div className="flex items-center p-4 border-b border-gray-300">
                <button onClick={handleBack} className="mr-4">
                  ← Back
                </button>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={selectedUser?.profilePicture}
                    alt="profile-image"
                    size="40"
                    round={true}
                  />
                  <span>{selectedUser?.username}</span>
                </div>
              </div>
            )}

            {/* Desktop Header */}
            {!isMobileChatOpen && (
              <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
                <Avatar
                  src={selectedUser?.profilePicture}
                  alt="profile-image"
                  size="40"
                  round={true}
                />
                <div className="flex flex-col">
                  <span>{selectedUser?.username}</span>
                </div>
              </div>
            )}

            {/* Messages */}
            <Messages selectedUser={selectedUser} />

            {/* Message Input */}
            <div className="flex items-center p-4 border-t border-t-gray-300">
              <input
                type="text"
                className="flex-1 mr-2 focus-visible:ring-transparent p-2 border border-gray-300 rounded-md"
                placeholder="Message..."
              />
              <button>
                <IoIosSend size={24} />
              </button>
            </div>
          </section>
        )}

        {/* Placeholder for when no user is selected on desktop */}
        {!selectedUser && (
          <div className="flex flex-col items-center justify-center mx-auto w-full md:w-3/4">
            <TbMessageCircleCode className="w-32 h-32 my-4" />
            <h1 className="font-medium text-xl">Your messages</h1>
            <span>Send a message to start a chat</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatPage;
