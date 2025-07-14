import Job from "../models/Job.js";

//get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "error fetching all jobs",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error! Could not fetch jobs",
    });
  }
};

//get a single job by id
export const getJobByID = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Error fetching job details",
      });
    }
    res.status(200).json({
      success: true,
      message: "job details fetched successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error! could not fetch job details",
    });
  }
};
