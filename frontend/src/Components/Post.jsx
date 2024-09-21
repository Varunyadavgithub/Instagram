import React, { useState } from "react";
import Avatar from "react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const dispatch = useDispatch();

  const changEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeAndDislike = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post?._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        // update the post
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${post._id}/comment`,
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
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
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

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const uptadedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(uptadedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res =await  axios.get(
        `http://localhost:8000/api/v1/post/${post?._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="my-8 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              src={post.author?.profilePicture}
              alt="profile-image"
              size="40"
              round={true}
            />
            <div className="flex items-center gap-4">
              <h1>{post.author?.username}</h1>
              {user?._id === post.author?._id && (
                <span className="bg-gray-200 rounded-full font-semibold text-xs px-2 py-1.5">
                  Author
                </span>
              )}
            </div>
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
              {user && user?._id === post?.author?._id && (
                <button
                  variant="ghost"
                  onClick={deletePostHandler}
                  className="cursor-pointer w-fit font-semibold p-3 rounded-md"
                >
                  Delete Post
                </button>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <img
          src={post.image}
          alt="post-image"
          className="rounded-sm my-2 w-full aspect-square object-cover"
        />
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            {liked ? (
              <FaHeart
                size={24}
                className="cursor-pointer text-red-600"
                onClick={likeAndDislike}
              />
            ) : (
              <FaRegHeart
                size={24}
                className="cursor-pointer hover:text-gray-600"
                onClick={likeAndDislike}
              />
            )}
            <TbMessageCircle
              size={24}
              className="cursor-pointer hover:text-gray-600"
              onClick={() => {
                dispatch(setSelectedPost(post));
                setOpen(true);
              }}
            />
            <FiSend size={24} className="cursor-pointer hover:text-gray-600" />
          </div>
          <FaRegBookmark
            onClick={bookmarkHandler}
            size={24}
            className="cursor-pointer hover:text-gray-600"
          />
        </div>
        <span className="font-medium block mb-2">{postLike} likes</span>
        <p>
          <span className="font-medium mr-2">{post.author?.username}</span>
          {post.caption}
        </p>
        {comment.length > 0 && (
          <span
            className="cursor-pointer text-md text-gray-400"
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
          >
            View all {comment.length} comments
          </span>
        )}
        <CommentDialog open={open} setOpen={setOpen} />
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={text}
            onChange={changEventHandler}
            placeholder="Add a comment..."
            className="outline-none text-sm w-full"
          />
          {text && (
            <span
              onClick={commentHandler}
              className="text-[#38ADF8] cursor-pointer"
            >
              Post
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
