import Job from "../models/Job.js";
import jobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

//Get user data
export const getUserData = async (req, res) => {
  //from clerk
  const userId = req.auth().userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error! Please try again for fetching user",
    });
  }
};

//apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth().userId;

  try {
    const isAlreadyApplied = await jobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.status(203).json({
        success: false,
        message: "Already applied.",
      });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(203).json({
        success: false,
        message: "Applying for a different job",
      });
    }

    await jobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.status(200).json({
      success: true,
      message: "Job applied successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error! Could not apply",
    });
  }
};

//get user applied applications
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const applications = await jobApplication
      .find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.status(404).json({
        success: false,
        message: "No job applications found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update user profile (resume)
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.status(200).json({
      success: true,
      message: "Resume updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
