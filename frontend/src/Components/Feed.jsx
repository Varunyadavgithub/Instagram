import React from "react";
import Posts from "./Posts";

const Feed = () => {
  return (
    <>
      <div className="flex-1 px-2 my-8 flex flex-col items-center lg:pl-[10%]">
        <Posts />
      </div>
    </>
  );
};

export default Feed;
