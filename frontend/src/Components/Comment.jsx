import React from "react";
import Avatar from "react-avatar";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="my-2">
        <div className="flex gap-3 items-center">
          <Avatar
            src={comment?.author?.profilePicture}
            size="40"
            round={true}
          />
          <h1 className="text-sm font-bold">{comment?.author?.username}<span className="font-normal pl-2">{comment?.text}</span></h1>
        </div>
      </div>
    </>
  );
};

export default Comment;
