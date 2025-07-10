import React, { useContext } from "react";
import { assets } from "./../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();

  const { setShowRecruitorLogin } = useContext(AppContext);

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={()=> navigate('/')} className="cursor-pointer" src={assets.logo} alt="company logo" />

        {user ? (
          <div className="flex items-center gap-3 font-medium text-gray-800">
            <Link
              to={"/applications"}
              className=" bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 sm:px-8 sm:text-center py-2 rounded-full"
            >
              Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi, {user.firstName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-3 max-sm:text-xs font-medium">
              <button
                onClick={e => setShowRecruitorLogin(true)}
                className="text-gray-600 hover:bg-gray-100  px-2 sm:px-3 py-2 rounded-full cursor-pointer">
              Recruitor Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer hover:bg-blue-700 active:bg-blue-800"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
