import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../../assets/assets";
import axios from "axios";
import { AppContext } from "./../../context/AppContext";
import { toast } from "react-toastify";
import useCompanyAuthRedirect from "../../hooks/useCompanyAuthRedirect";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken, isAuthLoading ,    setJobsRefreshTrigger} = useContext(AppContext);

  //waiting for token
   const isCheckingAuth = useCompanyAuthRedirect(companyToken,isAuthLoading);


  if (isCheckingAuth)
  {
    return (
      <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-5 border-gray-400  border-t-blue-600"></div>
    </div>
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        { title, description, location, salary, category, level },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
           setJobsRefreshTrigger(prev=>!prev)
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    //Initiate quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="container p-4 flex flex-col w-full gap-3 items-start"
      >
        <div className="w-full">
          <p className="mb-2">Job Title</p>
          <input
            className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
            type="text"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        <div className="w-full max-w-lg ">
          <p className="my-2">Job Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full lg:gap-8">
          <div>
            <p className="mb-2">Job Category</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setCategory(e.target.value)}
            >
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2">Job Location</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setLocation(e.target.value)}
            >
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2">Job Level</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Beginner Level">Beginner Level</option>
              <option value="Intermediate Level">Intermediate Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div>
        </div>

        <div>
          <p className="mb-2">Job Salary</p>
          <input
            min={0}
            className="w-full px-3 py-2 border-2 border-gray-300  rounded sm:w-[120px]"
            type="number"
            placeholder="2500"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
          />
        </div>

        <button className="py-3 w-28 mt-4 bg-black cursor-pointer active:bg-gray-500 text-white rounded">
          ADD
        </button>
      </form>
    </>
  );
};

export default AddJob;
