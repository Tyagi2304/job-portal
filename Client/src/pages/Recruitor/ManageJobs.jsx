import React, { useContext, useEffect, useState } from "react";
import { manageJobsData } from "../../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import useCompanyAuthRedirect from "../../hooks/useCompanyAuthRedirect";
import axios from "axios";

const ManageJobs = () => {
  const navigate = useNavigate();

  const { isAuthLoading, companyToken, backendUrl, setJobsRefreshTrigger } = useContext(AppContext);

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  //to fetch company jobs application data
  const fetchCompanyJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/company/jobs-list", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //to delete a job
  const deleteJob = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/delete-job",
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setJobs((prev) => prev.filter((job) => job._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
    }
  };

  //to change job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setJobs((prev) =>
          prev.map((job) =>
            job._id === id ? { ...job, visible: !job.visible } : job
          )
        );
        fetchCompanyJobs();
        setJobsRefreshTrigger(prev=>!prev)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  //waiting for token
  const isCheckingAuth = useCompanyAuthRedirect(isAuthLoading, companyToken);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-5 border-gray-400  border-t-blue-600 "></div>
      </div>
    );
  }

  return loading ? (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-5 border-gray-400  border-t-blue-600"></div>
    </div>
  ) : jobs.length === 0 ? (
    <div className="flex items-center justify-center h-[70vh]">
      <p className="text-xl sm:text-2xl ">No Jobs available or posted </p>
    </div>
  ) : (
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
              <th className="py-2 px-4 border-b border-gray-300 text-center max-sm:hidden" >
                Applicants
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Visible
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b  max-sm:hidden border-gray-300">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {job.title}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300">
                  {moment.utc(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden border-gray-300 text-center">
                  {job.applicants}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <input
                    onChange={() => {
                      changeJobVisibility(job._id);
                    }}
                    type="checkbox"
                    className="scale-125 cursor-pointer ml-4"
                    checked={job.visible}
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-300 text-center">
                  <button onClick={() => confirmDelete(job._id)}
                  className="bg-red-100 cursor-pointer text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm">
                    Delete
                  </button>
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
