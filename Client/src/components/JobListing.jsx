import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(true);
  //to maintain pagination
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setselectedCategories] = useState([]);
  const [selectedLocations, setselectedLocations] = useState([]);

  const [filteredJobs, setfilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setselectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setselectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);
    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setfilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* SIDE BAR*/}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search filter from hero */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 border bg-blue-50 border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                      className="cursor-pointer"
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2.5 border bg-red-50 border-red-200 px-4 py-1.5 rounded ml-3">
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      src={assets.cross_icon}
                      className="cursor-pointer"
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border hover:bg-gray-100 active:bg-gray-50 cursor-pointer border-gray-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/*Category filter*/}
        <div className="max-lg:flex max-lg:flex-row max-lg:gap-15 max-sm:gap-10">
          <div className={showFilter ? "" : "max-lg:hidden"}>
            <h4 className="font-medium text-lg py-4">Search by Categories</h4>
            <ul className="space-y-4 text-gray-700">
              {JobCategories.map((category, index) => (
                <li className="flex gap-3 items-center" key={index}>
                  <input
                    className="scale-125 cursor-pointer"
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/*Location filter*/}
          <div className={showFilter ? "" : "max-lg:hidden"}>
            <h4 className="font-medium text-lg py-4 lg:pt-14">
              Search by Locations
            </h4>
            <ul className="space-y-4 text-gray-700">
              {JobLocations.map((location, index) => (
                <li className="flex gap-3 items-center" key={index}>
                  <input
                    className="scale-125 cursor-pointer"
                    type="checkbox"
                    onChange={() => handleLocationChange(location)}
                    checked={selectedLocations.includes(location)}
                  />
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4 ">
        <h3 className="font-semibold text-4xl py-2" id="Job-list">
          Latest jobs
        </h3>
        <p className="mb-8 text-lg">Get your desired jobs from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/*Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#Job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a href="#Job-list" key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-400 cursor-pointer rounded-full ${
                      currentPage === index + 1
                        ? "bg-blue-100 border-blue-700 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a
              href="#Job-list"
              onClick={() =>
                setCurrentPage(
                  Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6))
                )
              }
            >
              <img src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
