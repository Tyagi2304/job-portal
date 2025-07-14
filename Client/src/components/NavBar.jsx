import React, { useContext } from "react";
import { assets } from "./../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();

  const {
    setShowRecruitorLogin,
    companyData,
    setCompanyToken,
    setCompanyData,
  } = useContext(AppContext);

  return (
    <div className="shadow-md  py-4 w-full bg-blue-50">
      <div className="w-full px-4 sm:px-8 lg:px-15 xl:px-20 flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt="company logo"
        />

        {companyData ? (
          // Recruiter UI
          <div className="flex items-center gap-3 font-medium text-gray-800">
            <Link
              to={"/dashboard"}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-8 py-2 rounded-full"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("companyToken");
                setCompanyToken(null);
                setCompanyData(null);
              }}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : user ? (
          <div className="flex items-center gap-3 font-medium  text-gray-800">
            <Link
              to={"/applications"}
              className=" bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white px-4 sm:px-8 sm:text-center py-2 rounded-full"
            >
              Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi, {user.firstName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-3 items-center font-medium">
            <button
              onClick={(e) => setShowRecruitorLogin(true)}
              className="text-gray-600 hover:bg-gray-200 active:bg-gray-50  px-2 sm:px-3 py-2 rounded-full cursor-pointer"
            >
              Recruiter Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer hover:bg-blue-700 active:bg-blue-500"
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
