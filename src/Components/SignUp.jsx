import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdHome } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const imgHostingKey = import.meta.env.VITE_imgBbKey;
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const SignUp = () => {
  const { createNewUser, updateProfileInfo } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImageName, setSelectedImageName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const todayDate = new Date().toISOString().split("T")[0];

  const handleImageInput = (e) => {
    e.preventDefault();
    const fileInput = e.target;
    if (fileInput.files.length > 0) {
      const file = { image: fileInput.files[0] };
      const fileName = fileInput.files[0].name;
      setSelectedImageName(fileName);
      setSelectedImage(file);
    } else {
      setSelectedImageName("");
    }
  };

  // sign up functionality
  const handleSignUp = (e) => {
    e.preventDefault();
    if (selectedImage) {
      axiosPublic
        .post(imgUploadUrl, selectedImage, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data) {
            const name = e.target.name.value;
            const userName = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const photo = res.data.data.display_url;
            const userCreationDate = todayDate;
            const userType = "user";
            const verifyStatus = "not verified";

            const newUserInfo = {
              name,
              email,
              userName,
              photo,
              userCreationDate,
              userType,
              verifyStatus,
            };
            const regExPattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
            setPasswordErrorMessage();

            // password vaidation
            if (!regExPattern.test(password)) {
              setPasswordErrorMessage(
                "Password should be minimum 6 characters, contain at least 1 capital letter & 1 special character"
              );
              return;
            }
            createNewUser(email, password)
              .then((result) => {
                if (result.user) {
                  const currentUsersInfo = result.user;
                  axiosPublic
                    .post("/newUserApi", newUserInfo)
                    .then((res) => {
                      const data = res.data;
                      if (data.insertedId) {
                        toast.success("Account creation successfull");
                        updateProfileInfo(userName, photo);
                        navigate(location?.state ? location.state : "/");
                      }
                    })
                    .catch((err) => {
                      const error = err.code + "-" + err.message;
                      toast.error(error);
                    });
                }
              })
              .catch((error) => {
                toast.error(error.code + "-" + error.message);
              });
          }
        })
        .catch((err) => toast.error(err.code + "|" + err.message));
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto p-5 min-h-[100vh] flex flex-col justify-center items-center relative">
      <div className="space-y-14 flex flex-col justify-center items-center w-full font-heading">
        <h2 className="text-3xl text-main font-bold text-center ">
          Sign up for free!
        </h2>
        <form
          onSubmit={handleSignUp}
          className="flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 space-y-7 lg:space-y-10 px-10 "
        >
          <input
            type="text"
            name="name"
            placeholder="Full name"
            id="name"
            className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            id="eamil"
            className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full"
          />
          <input
            required
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full"
          />
          <div className="w-full">
            <div className="flex relative w-full justify-center items-center">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                id="password"
                className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full"
              />
              <span
                onClick={handleShowPassword}
                className="absolute right-2 text-[gray]"
              >
                {" "}
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}{" "}
              </span>
            </div>
            {passwordErrorMessage ? (
              <p className="text-[14px] font-regular text-[#c73c3c]">
                {passwordErrorMessage}
              </p>
            ) : (
              ""
            )}
          </div>
          <label
            htmlFor="image"
            className="cursor-pointer relative focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full text-[gray] flex justify-start items-center gap-2"
          >
            <FaUpload />{" "}
            {selectedImageName.length > 25
              ? selectedImageName.slice(0, 25) + "...."
              : selectedImageName || "Choose your profile picture"}
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageInput}
              className="cursor-pointer opacity-0 absolute top-0 left-0 w-full"
            />
          </label>
          <input
            type="submit"
            value="Sign up"
            className="bg-main px-4 py-2 rounded text-white font-bold  hover:bg-sub duration-300 w-full"
          />
        </form>
        <Link
          to="/"
          className="absolute top-0 left-5 flex justify-center items-center gap-2 text-[18px] font-semibold hover:text-main duration-500 hover:scale-105"
        >
          <MdHome /> Back to Home
        </Link>
      </div>
      <div className="flex justify-center items-center flex-col font-heading">
        <div className="mt-5 flex justify-center items-center gap-1">
          <p className="text-center font-semibold ">Already have an account?</p>
          <Link
            to="/login"
            className="font-bold  border-t-2 border-t-[#ffffff00] border-b-2 border-main hover:bg-main hover:text-white px-2 py-1 hover:border-t-2 duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
