import React from "react";
import { assets, viewApplicationsPageData } from "../../assets/assets";

const ViewApplications = () => {
  return (
    <div className="container  mx-auto p-4">
      <div>
        <table className="w-full max-w-4xl bg-white border border-gray-300 max-sm:text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b text-center border-gray-300">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b text-center border-gray-300">
                  <img src={applicant.imgSrc} alt="" />
                  <span>{applicant.name}</span>
                </td>
                <td className="py-2 px-4 border-b text-center border-gray-300 max-sm:hidden ">
                  {applicant.jobTitle}
                </td>
                <td className="py-2 px-4 border-b text-center border-gray-300 max-sm:hidden">
                  {applicant.location}
                </td>
                <td className="py-2 px-4 border-b text-center border-gray-300">
                  <a
                    href=""
                    target="_blank"
                    className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-gray-300 relative">
                  <div className="relative inline-block text-left group ">
                    <button className=" text-gray-500 action-button">
                      ...
                    </button>
                    <div className="z-10 hidden absolute right-0 md:left-0 top-0  mt-2 w-32 bg-white border border-gray-400 rounded  shadow group-hover:block">
                      <button className="block w-full text-left px-4 py-3 text-blue-500 hover:bg-blue-200">
                        Accept
                      </button>
                      <button className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-200">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
