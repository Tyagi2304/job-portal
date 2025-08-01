import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className=" shadow-[inset_0_6px_6px_-6px_rgba(0,0,0,0.3)] bg-blue-50  ">
      <div className=" px-4 2xl:px-20 mx-auto flex justify-between items-center gap-4 py-3 ">
        <img width={160} src={assets.logo} alt="" />
        <p className="flex-1 border-l border-gray-400 pl-4 text-base text-gray-700 max-sm:hidden">
          Copyright @Infinityhire pvt lmt | All rigths reserved.
        </p>
        <div className="flex gap-2.5">
          <img width={38} src={assets.facebook_icon} alt="" />
          <img width={38} src={assets.twitter_icon} alt="" />
          <img width={38} src={assets.instagram_icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
