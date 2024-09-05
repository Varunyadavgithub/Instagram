import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./comment";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import toast from "react-hot-toast";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost?.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost._id}/comment`,
        { text },
        {
          haders: {
            "content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="max-w-5xl p-0 flex flex-col"
        >
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src={selectedPost?.image}
                alt="post-image"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Link to="">
                    <Avatar
                      src={selectedPost?.author?.profilePicture}
                      alt="profile-image"
                      size="40"
                      round={true}
                    />
                  </Link>
                  <div>
                    <Link className="flex flex-col items-center justify-center">
                      <Link className="font-semibold text-xl">
                        {selectedPost?.author?.username}
                      </Link>
                      {/* <span className="text-gray-600 text-sm">{selectedPost?.bio}</span> */}
                    </Link>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center text-sm text-center">
                    <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                      Unfollow
                    </div>
                    <div className="cursor-pointer w-full">
                      Add to favorites
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {comment.map((comment) => (
                  <Comment key={comment?._id} comment={comment} />
                ))}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={text}
                    onChange={changeEventHandler}
                    placeholder="Add a comment..."
                    className="w-full p-2 outline-none text-sm border border-gray-300 rounded-md"
                  />
                  <button
                    disabled={!text.trim()}
                    onClick={sendMessageHandler}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentDialog;
