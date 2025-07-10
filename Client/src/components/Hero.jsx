import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import CompanySlider from "./CompanySlider";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setIsSearched, setSearchFilter } = useContext(AppContext);
  const titelRef = useRef(null);
  const locationRef = useRef(null);

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
    <div className="container 2xl:px-20 px-2 mx-auto my-10">
      <div className="bg-gradient-to-r from-teal-600 to-teal-900 shadow-xl text-white py-16 text-center mx-2 mb-1 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-normal px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex items-center justify-between max-sm:flex-col bg-white rounded text-gray-900 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex">
            <div className="flex items-center">
              <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
              <input
                type="text"
                placeholder="Search for jobs"
                className="max-sm:text-sm rounded outline-none p-2 w-full"
                ref={titelRef}
              />
            </div>
            <div className="flex items-center ">
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
      <div className="flex container justify-center items-center max-sm:flex-col overflow-hidden mt-5 py-1 rounded-md border border-gray-300">
        <h3 className="font-medium whitespace-nowrap ml-2">Trusted by</h3>
        <CompanySlider />
      </div>
    </div>
  );
};

export default Hero;
