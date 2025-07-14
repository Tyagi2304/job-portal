import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecruitorLogin from "./components/Recruitor/RecruitorLogin";
import DashBoard from "./pages/Recruitor/DashBoard";
import AddJob from "./pages/Recruitor/AddJob";
import ManageJobs from "./pages/Recruitor/ManageJobs";
import ViewApplications from "./pages/Recruitor/ViewApplications";
import "quill/dist/quill.snow.css";
//error ui from toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardHome from "./pages/Recruitor/DashboardHome";

//to use nested routes use outlet
const App = () => {
  const navigate = useNavigate();
  const { showRecruitorLogin, companyToken } = useContext(AppContext);
  return (
    <div>
      {showRecruitorLogin && <RecruitorLogin />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/apply-job/:id" element={<ApplyJob />}></Route>
        <Route path="/applications" element={<Applications />}></Route>
        {companyToken ? (
          <Route path="/dashboard" element={<DashBoard />}>
            <Route path="home" element={<DashboardHome />} /> 
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-job" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplications />} />
          </Route>
        ) : null}
      </Routes>
    </div>
  );
};

export default App;
