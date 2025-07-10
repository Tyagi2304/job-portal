import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const RecruitorLogin = () => {
  const [loginState, setLoginState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);

    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
    
    const { setShowRecruitorLogin } = useContext(AppContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loginState === "Sign Up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
    }
    };

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
              document.body.style.overflow = "unset"
        }
    },[])
    
    

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30  flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        action=""
        className="relative bg-white p-10 rounded-xl text-slate-700"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruitor {loginState}
        </h1>
        <p>Welcome back! Please sign in to continue</p>
        {loginState === "Sign Up" && isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={image? URL.createObjectURL(image) :  assets.upload_area}
                  alt=""
                />
                <input onChange={(e)=> setImage(e.target.files[0])} type="file" name="" id="image" hidden />
              </label>
              <p>
                Upload Company <br />
                Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {loginState !== "Login" && (
              <div className="border border-gray-400 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  type="text"
                  name=""
                  placeholder="Company Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            )}

            <div className="border border-gray-400 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="email"
                name=""
                placeholder="Email ID"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="border border-gray-400 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="password"
                name=""
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </>
        )}
              {loginState ==="Login" ?  <p className="text-sm  text-blue-600 mt-4 cursor-pointer">
          Forgot Password?
        </p> : null }
             

        <button
          type="submit"
          className="bg-blue-600 mt-4  w-full text-white cursor-pointer py-2 rounded-full"
        >
          {loginState === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>

        {loginState === "Login" ? (
          <p className="mt-5 text-center">
            Dont have an account?{" "}
            <span
              className="cursor-pointer  text-blue-600"
              onClick={() => setLoginState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setLoginState("Login")}
            >
              Login
            </span>
          </p>
              )}
              
              <img onClick={(e) => setShowRecruitorLogin(false)} src={assets.cross_icon} className="absolute top-5 right-5 cursor-pointer" alt="" />
      </form>
    </div>
  );
};

export default RecruitorLogin;
