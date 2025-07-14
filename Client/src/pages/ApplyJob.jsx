import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import NavBar from "./../components/NavBar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

function ApplyJob() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { getToken } = useAuth();

  const [jobData, setJobData] = useState(null);

  const [isAlreadyAppied, setIsAlreadyApplied] = useState(false);

  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //to apply for a job
  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Login to apply for jobs");
      }

      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Upload resume to apply for jobs");
      }

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/users/apply",
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //to check if already applied
  const checkAlreadyApplied = () => {
    const isApplied = userApplications.some(
      (item) => item.jobId._id === jobData._id
    );
    setIsAlreadyApplied(isApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  }, [jobData, userApplications, id]);

  return jobData ? (
    <>
      <div>
        <NavBar />
        <div className="min-h-screen flex flex-col p-10 container px-4 2xl:px-20 mx-auto">
          <div className="bg-white text-black rounded-lg w-full">
            <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-gradient-to-r from-teal-900 to-teal-700 border border-sky-50  rounded-xl ">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border-gray-300"
                  src={jobData.companyId.image}
                  alt="company-icon"
                />
                <div className="text-center md:text-left  text-white">
                  <h1 className="text-2xl sm:text-4xl font-medium">
                    {jobData.title}
                  </h1>
                  <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-white mt-3">
                    <span className="flex items-center gap-1">
                      <img src={assets.suitcase_icon} alt="" />
                      {jobData.companyId.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={assets.location_icon} alt="" />
                      {jobData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={assets.person_icon} alt="" />
                      {jobData.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={assets.money_icon} alt="" />
                      CTC: ${kconvert.convertTo(jobData.salary)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center text-gray-700">
                <button
                  onClick={applyHandler}
                  className={
                    isAlreadyAppied
                      ? "bg-gray-400 cursor-pointer text-lg p-2.5 px-10 text-white rounded"
                      : "bg-blue-600 cursor-pointer text-lg hover:bg-blue-700 active:bg-blue-500 p-2.5 px-10 text-white rounded"
                  }
                >
                  {isAlreadyAppied ? "Already applied" : "Apply now"}
                </button>
                <p className="mt-1 text-white ">
                  Posted {moment(jobData.date).fromNow()}
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="w-full lg:w-2/3">
                <h2 className="font-bold text-2xl mb-4">Job Description</h2>
                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{ __html: jobData.description }}
                ></div>
                <button
                  onClick={applyHandler}
                  className={
                    isAlreadyAppied
                      ? "bg-gray-400 p-2.5 px-10 mt-1 cursor-pointer  text-white rounded"
                      : "bg-blue-600 p-2.5 px-10 mt-1 cursor-pointer hover:bg-blue-700 active:bg-blue-500 text-white rounded"
                  }
                >
                  {isAlreadyAppied ? "Already applied" : "Apply now"}
                </button>
              </div>

              {/*JOb desc right section of more jobs */}
              <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
                <h2 className="text-lg">
                  More jobs from {jobData.companyId.name}
                </h2>
                {jobs
                  .filter(
                    (job) =>
                      job._id !== jobData._id &&
                      job.companyId._id === jobData.companyId._id
                  )
                  .filter((job) => {
                    //set of applied job ids
                    const appliedJobIds = new Set(userApplications.map(app => app.jobiId && app.jobId._id))
                    
                    //return true if user has not applied for this job
                    return !appliedJobIds.has(job._id)
                  })
                  .slice(0, 4)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default ApplyJob;
