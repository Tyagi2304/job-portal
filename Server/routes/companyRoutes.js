import express, { Router } from "express";
import { loginCompany, registerCompany } from "../controllers/companyAuth.js";
import {
  getCompanyData,
  changeJobApplicationsStatus,
  changeVisibilty,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  postJob,
  deleteJob,
  getCompanyDashboardStats
} from "../controllers/companyController.js";
import handleImageUpload from "../middlewares/uploadImage.js";
import protectCompany from "../middlewares/authMiddleware.js";

const router = express.Router();

//register a company
router.post("/register", handleImageUpload, registerCompany);

//company login
router.post("/login", loginCompany);

//get company data
router.get("/company", protectCompany, getCompanyData);

//post a job
router.post("/post-job", protectCompany, postJob);

//delete a job
router.post("/delete-job", protectCompany, deleteJob);

//get applicants applied to company jobs
router.get("/applicants", protectCompany, getCompanyJobApplicants);

//get company jobs list
router.get("/jobs-list", protectCompany, getCompanyPostedJobs);

//change application status
router.post("/change-status", protectCompany, changeJobApplicationsStatus);

//get company dashboard stats
router.get("/dashboard-stats", protectCompany, getCompanyDashboardStats);

//change application visibility
router.post("/change-visibility", protectCompany, changeVisibilty);

export default router;
