import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center w-screen h-screen justify-center">
        <form
          onSubmit={signupHandler}
          className="shadow-2xl rounded-md flex flex-col gap-2 md:gap-3 p-2 m-2 md:p-8 border border-gray-300"
        >
          <div className="my-3">
            <h1 className="text-center text-2xl md:text-4xl font-bold">
              Instagram
            </h1>
            <p className="text-md text-center mt-2 font-semibold">
              Signup to see photos & videos from your friends
            </p>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Username</span>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-1 p-2 border border-black rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Email</span>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-1 p-2 border border-black rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Password</span>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-1 p-2 border border-black rounded-md"
            />
          </div>
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 p-2 rounded-md text-white text-lg"
          >
            {loading ? "Loading..." : "Signup"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
