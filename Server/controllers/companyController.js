import Job from "../models/Job.js";
import jobApplication from "../models/JobApplication.js";

//Get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    if (!company) {
      return res.status(203).json({
        success: false,
        message: "Could not fetch company data",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Company data fetched successfully",
      company,
    });
  } catch (error) {
    console.log("Error fetching company data", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error! Please try again",
    });
  }
};

//Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;

  try {
    const newJob = await Job.create({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      newJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error! Could not create job.",
    });
  }
};

//Delete a job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(203).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.companyId.toString() !== companyId.toString()) {
      return res.status(203).json({
        success: false,
        message: "Unauthosized to delete this job",
      });
    }

    //delete job
    await Job.deleteOne({ _id: id });

    //delete job applications related to job
    await jobApplication.deleteMany({ jobId: id });

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error! could not delete job",
    });
  }
};

//Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;
    //find job applicants for user and populate related data
    const applications = await jobApplication
      .find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location salary category level")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Job applicants fetched successfully",
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

//Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId: companyId });
    if (jobs.length === 0) {
      return res.status(204).json({
        success: true,
        message: "No jobs posted by this company",
        jobsData: [],
      });
    }

    //adding number of applicants in data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await jobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobsData,
    });
  } catch (error) {
    console.log("Error fetching jobs", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error! Please try again",
    });
  }
};

//company daashboard stats
export const getCompanyDashboardStats = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });
    const totalJobs = jobs.length;

    const visibleJobs = jobs.filter((job) => job.visible).length;
    const hiddenJobs = totalJobs - visibleJobs;

    const applications = await jobApplication.find({ companyId });
    const totalApplications = applications.length;

    const pending = applications.filter(
      (app) => app.status === "Pending"
    ).length;
    const accepted = applications.filter(
      (app) => app.status === "Accepted"
    ).length;
    const rejected = applications.filter(
      (app) => app.status === "Rejected"
    ).length;

    // Category distribution
    const categoryStats = {};
    for (const job of jobs) {
      categoryStats[job.category] = (categoryStats[job.category] || 0) + 1;
    }

    res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        visibleJobs,
        hiddenJobs,
        totalApplications,
        pending,
        accepted,
        rejected,
        categoryStats,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//change job application acceptance status
export const changeJobApplicationsStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    //Find job application and update status
    await jobApplication.findOneAndUpdate({ _id: id }, { status });
    res.status(200).json({
      success: true,
      message: "Status changed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//change job visibility
export const changeVisibilty = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Changed visibility of job",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error! Could not change visibility",
    });
  }
};
