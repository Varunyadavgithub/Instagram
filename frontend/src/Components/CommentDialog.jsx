import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  const sendMessageHandler = async () => {
    alert(text);
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
                src="https://images.unsplash.com/photo-1693773852578-65cf594b62dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRldmVsb3BlciUyMHNldHVwfGVufDB8fDB8fHww"
                alt="post-image"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Link to="">
                    <Avatar
                      src="#"
                      alt="profile-image"
                      size="40"
                      round={true}
                    />
                  </Link>
                  <div>
                    <Link>
                      <Link className="font-semibold text-xs">username</Link>
                      {/* <span className="text-gray-600">Bio here...</span> */}
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
              <div className="flex-1 overflow-y-hidden max-h-96 p-4">
                Coments ayenge
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={text}
                    onChange={changeEventHandler}
                    placeholder="Add a comment..."
                    className="w-full p-2 outline-none border border-gray-300 rounded-md"
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
