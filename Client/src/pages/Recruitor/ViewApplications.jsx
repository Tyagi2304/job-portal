import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import useCompanyAuthRedirect from "../../hooks/useCompanyAuthRedirect";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const ViewApplications = () => {
  const { isAuthLoading, companyToken, backendUrl } = useContext(AppContext);

  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(true);

  //function to fetch company job applicants
  const fetchCompanyJobApplications = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  //function to update job application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  //waiting for token
  const isCheckingAuth = useCompanyAuthRedirect(isAuthLoading, companyToken);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-5 border-gray-400  border-t-blue-600"></div>
      </div>
    );
  }

  return loading ? (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-5 border-gray-400  border-t-blue-600"></div>
    </div>
  ) : applicants.length === 0 ? (
    <div className="flex items-center justify-center h-[70vh]">
      <p className="text-xl sm:text-2xl ">No Jobs available or posted </p>
    </div>
  ) : (
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
            {applicants
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-4 border-b text-center border-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-gray-300">
                    <div className="flex items-center gap-2 mr-1">
                      <img
                        src={applicant.userId.image}
                        alt=""
                        className="h-8 w-8 object-cover rounded"
                      />
                      <span>{applicant.userId.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-center border-gray-300 max-sm:hidden ">
                    {applicant.jobId.title}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-gray-300 max-sm:hidden">
                    {applicant.jobId.location}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-gray-300">
                    <a
                      href={applicant.userId.resume}
                      target="_blank"
                      className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center"
                    >
                      Resume <img src={assets.resume_download_icon} alt="" />
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 relative">
                    {applicant.status === "Pending" ? (
                      <div className="relative inline-block text-left group ">
                        <button className=" text-gray-500 action-button">
                          ...
                        </button>
                        <div className="z-10 hidden absolute right-0 md:left-0 top-0  mt-2 w-32 bg-white border border-gray-400 rounded  shadow group-hover:block">
                          <button
                            onClick={() =>
                              changeJobApplicationStatus(
                                applicant._id,
                                "Accepted"
                              )
                            }
                            className="block w-full text-left px-4 py-3 text-blue-500 hover:bg-blue-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              changeJobApplicationStatus(
                                applicant._id,
                                "Rejected"
                              )
                            }
                            className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>{applicant.status}</div>
                    )}
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
