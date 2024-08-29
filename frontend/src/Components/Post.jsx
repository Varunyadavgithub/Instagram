import React, { useState } from "react";
import Avatar from "react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const Post = () => {
  const [text, setText] = useState("");
  const changEventHandler=(e)=>{
    const inputText=e.target.value;
    if(inputText.trim()){
        setText(inputText);
    }else{
        setText("");
    }
  }
  return (
    <>
      <div className="my-8 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src="#" alt="profile-image" size="40" round={true} />
            <h1>username</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center text-sm text-center">
              <button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-semibold p-3 rounded-md"
              >
                Unfollow
              </button>
              <button
                variant="ghost"
                className="cursor-pointer w-fit font-semibold p-3 rounded-md"
              >
                Add to favorites
              </button>
              <button
                variant="ghost"
                className="cursor-pointer w-fit font-semibold p-3 rounded-md"
              >
                Cancel
              </button>
            </DialogContent>
          </Dialog>
        </div>
        <img
          src="https://images.unsplash.com/photo-1693773852578-65cf594b62dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRldmVsb3BlciUyMHNldHVwfGVufDB8fDB8fHww"
          alt="post-image"
          className="rounded-sm my-2 w-full aspect-square object-cover"
        />
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            <FaRegHeart
              size={24}
              className="cursor-pointer hover:text-gray-600"
            />
            <TbMessageCircle
              size={24}
              className="cursor-pointer hover:text-gray-600"
            />
            <FiSend size={24} className="cursor-pointer hover:text-gray-600" />
          </div>
          <FaRegBookmark
            size={24}
            className="cursor-pointer hover:text-gray-600"
          />
        </div>
        <span className="font-medium block mb-2">1k likes</span>
        <p>
          <span className="font-medium mr-2">username</span>caption
        </p>
        <span>View all 50 comments</span>
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={text}
            onChange={changEventHandler}
            placeholder="Add a comment..."
            className="outline-none text-sm w-full"
          />
          {
            text && <span className="text-[#38ADF8]">Post</span>
          }
        </div>
      </div>
    </>
  );
};

export default Post;
