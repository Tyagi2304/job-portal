import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

function Applications() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
    fetchUserData,
  } = useContext(AppContext);

  //upload or update resume
  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user)
    {
      fetchUserApplications();
    }
  },[user])

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 flex-grow ">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit || !userData?.resume ? (
            <>
              <label htmlFor="resumeUpload" className="flex items-center">
                <p className="bg-blue-100 hover:bg-blue-200 active:bg-blue-50 text-blue-700 cursor-pointer px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  type="file"
                  accept="application/pdf"
                  name=""
                  hidden
                />
                <img
                  className="cursor-pointer"
                  src={assets.profile_upload_icon}
                  alt=""
                />
              </label>
              <button
                onClick={updateResume}
                className="bg-green-100 hover:bg-green-200 cursor-pointer border border-green-400 rounded-lg  px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 hover:bg-blue-200 active:bg-blue-50 text-blue-700 px-4 py-2 rounded"
                  href={userData.resume}
                  target='blank'
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-600 hover:bg-gray-100 border cursor-pointer active:bg-gray-100 border-gray-300 px-4 py-2 rounded"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Company
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Job Title
              </th>
              <th className="py-3 px-4 border-b border-gray-300 max-sm:hidden text-left">
                Location
              </th>
              <th className="py-3 px-4 border-b border-gray-300 max-sm:hidden text-left">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 h-8 object-cover rounded "
                        src={job.companyId.image}
                        alt=""
                      />
                      {job.companyId.name}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {job.jobId.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300  max-sm:hidden">
                    {job.jobId.location}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-200"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Applications;
