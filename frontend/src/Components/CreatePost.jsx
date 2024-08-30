import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { readFileAsDataUri } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const {posts}=useSelector(store=>store.post);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUri = await readFileAsDataUri(file);
      setImagePreview(dataUri);
    }
  };

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) {
      formData.append("image", file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/post/createpost",
        formData,
        {
          headers: {
            "content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]))
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle className="text-center lg:text-xl font-semibold">
              Create new Post
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-2 focus-visible:ring-transparent border-none outline-none"
              placeholder="Write a caption..."
            ></textarea>
            {imagePreview && (
              <div className="w-full h-64 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="preview-image"
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
            )}
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={fileChangeHandler}
            />
            <button
              onClick={() => imageRef.current.click()}
              className="w-fit bg-[#0095F6] hover:bg-[#206ec7] p-2 text-white rounded-md"
            >
              Select media
            </button>
          </div>
          {imagePreview &&
            (loading ? (
              <button className="flex items-center justify-center w-full bg-black p-2 text-white rounded-md">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
              </button>
            ) : (
              <button
                onClick={createPostHandler}
                type="submit"
                className="w-full bg-black p-2 text-white rounded-md"
              >
                Post
              </button>
            ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePost;
