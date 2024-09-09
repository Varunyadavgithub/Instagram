import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePicture: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePicture: file });
    }
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePicture) {
      formData.append("profilePicture", input.profilePicture);
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/user/profile/edit",formData,{
        headers:{
          'Content-Type':"multipart/form-data"
        },
        withCredentials:true
      });
      if (res.data.success) {
        const updatedUserData={
          ...user,
          bio:res.data.user?.bio,
          profilePicture:res.data.user?.profilePicture,
          gender:res.data.user?.gender
        }
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex max-w-2xl mx-auto pl-10">
        <section className="flex flex-col gap-6 w-full my-8">
          <h1 className="font-bold text-xl">Edit Profile</h1>
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={user?.profilePicture}
                alt="profile-image"
                size="40"
                round={true}
              />
              <div>
                <h1 className="font-semibold text-sm">{user?.username}</h1>
                <span className="text-gray-600 text-sm ">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <input
              ref={imageRef}
              onChange={fileChangeHandler}
              type="file"
              className="hidden"
            />
            <button
              onClick={() => imageRef?.current.click()}
              className="bg-[#0095F6] h-8 hover:bg-[#318bc7] rounded-md p-2 flex items-center justify-center text-white"
            >
              Change Photo
            </button>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-2">Bio</h1>
            <textarea
              name="bio"
              className="focus-visible:ring-transparent w-full border border-black rounded-md"
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
            ></textarea>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-2">Gender</h1>
            <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            {loading ? (
              <button
                disabled
                className="bg-[#0095F6] h-8 hover:bg-[#318bc7] rounded-md p-4 flex items-center justify-center text-white"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </button>
            ) : (
              <button
                onClick={editProfileHandler}
                className="bg-[#0095F6] h-8 hover:bg-[#318bc7] rounded-md p-4 flex items-center justify-center text-white"
              >
                Save
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default EditProfile;
