import React from "react";
import { manageJobsData } from "../../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const navigate = useNavigate();
  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-300 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left  max-sm:hidden">
                #
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Job Title
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left max-sm:hidden">
                location
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-center">
                Applicants
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Visible
              </th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b  max-sm:hidden border-gray-300">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {job.title}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  {job.applicants}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <input type="checkbox" className="scale-125 ml-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black active:bg-gray-500 cursor-pointer text-white py-2 px-4 rounded"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
