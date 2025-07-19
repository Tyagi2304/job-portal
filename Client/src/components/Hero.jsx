import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import CompanySlider from "./CompanySlider";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setIsSearched, setSearchFilter } = useContext(AppContext);
  const titelRef = useRef(null);
  const locationRef = useRef(null);

  const [bgStyle, setBgStyle] = useState({});

  const updateBgImage = () => {
    const width = window.innerWidth;
    if (width > 1280) {
      setBgStyle({
        backgroundImage: `url(${assets.heroImage})`,
      });
    } else {
      setBgStyle({
        backgroundImage: `url(${assets.hero})`,
      });
    }
  };

  useEffect(() => {
    updateBgImage();
    window.addEventListener("resize", updateBgImage);
    return () => window.removeEventListener("resize", updateBgImage);
  },[]);

  const onSearch = () => {
    setSearchFilter({
      title: titelRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);

    titelRef.current.value = "";
    locationRef.current.value = "";
  };

  return (
    <div className="container min-w-full mb-8">
      <div
        className="relative bg-cover bg-no-repeat xl:bg-right bg-center  text-gray-700 py-50 xl:py-30 px-6 md:px-10 mb-10"
        style={bgStyle}
      >
        <div className="relative xl:bg-white bg-blue-50 p-2 xl:p-5 rounded-lg shadow-xl z-10 max-w-2xl xl:mr-220 max-xl:top-40  mx-auto xl:ml-10 flex flex-col items-center xl:items-start justify-center text-left space-y-6 md:space-y-10">
          {/* Headings for medium and up */}
          <h2 className="text-6xl font-bold mb-5 hidden xl:block" style={{fontFamily: "DM Serif Display",}}>
            Over 10,000+ Jobs to apply
          </h2>
          <p className="max-w-xl text-lg font-medium hidden xl:block">
            Your Next Big Career Move Starts Right Here – Explore the Best Job
            Opportunities and Take the First Step Toward Your Future!
          </p>

          {/* Search Bar */}
          <div className="flex items-center justify-between flex-row bg-blue-50 rounded text-gray-900 max-w-xl pl-4 w-full">
            <div className="flex flex-grow w-full">
              <div className="flex items-center w-full md:w-auto">
                <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
                <input
                  type="text"
                  placeholder="Search jobs"
                  className="max-sm:text-sm rounded outline-none p-2 w-full"
                  ref={titelRef}
                />
              </div>
              <div className="flex items-center w-full md:w-auto">
                <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
                <input
                  type="text"
                  placeholder="Location"
                  className="max-sm:text-sm rounded outline-none p-2 w-full"
                  ref={locationRef}
                />
              </div>
            </div>
            <button
              onClick={onSearch}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer px-6 py-1 m-1 rounded text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex container justify-center items-center max-sm:flex-col overflow-hidden mt-5 py-1 rounded-md border mx-auto border-gray-300">
        <h3 className="font-medium whitespace-nowrap ml-4 pr-0.5">
          Trusted by
        </h3>
        <CompanySlider />
      </div>

      
    <div className="flex flex-col items-start container mx-auto overflow-hidden mt-10 py-2 ">
      
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "DM Serif Display", opacity: "0.8" }}>Ready to Take the Leap in Your Career?</h1>
        <p className="text-2xl text-gray-600">From fresher roles to senior positions — find jobs that match your skills and career goals.</p>
      
    </div>
    </div>

  );
};

export default Hero;
