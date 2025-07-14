import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvidor = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //token from clerk to fetch user data
  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [showRecruitorLogin, setShowRecruitorLogin] = useState(false);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [jobsRefreshTrigger, setJobsRefreshTrigger] = useState(false);

  const [companyStats, setCompanyStats] = useState(null)

  //to store all jobs
  const [jobs, setJobs] = useState([]);

  //to store user data
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  //state var for recruitor login backend
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  //function to fetch job data
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");
      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fetch user data function
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fetch company stats
  const fetchCompanyStats = async () => {
  try {
    const { data } = await axios.get(backendUrl + "/api/company/dashboard-stats", {
      headers: { token: companyToken },
    });
    if (data.success) {
      setCompanyStats(data.stats);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};  

  //fetch user applied application data
  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/users/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const validApplications = data.applications.filter(application => application.jobId && application.jobId._id)
        setUserApplications(validApplications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
  fetchJobs();
}, [jobsRefreshTrigger]);

  useEffect(() => {
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
    setIsAuthLoading(false);
  }, []);


  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruitorLogin,
    setShowRecruitorLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    isAuthLoading,
    setIsAuthLoading,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,
    companyStats,
    setCompanyStats,
    fetchCompanyStats,
    jobsRefreshTrigger,
    setJobsRefreshTrigger,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
