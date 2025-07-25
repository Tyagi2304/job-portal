import Company from "../models/Company.js";
import jwt from "jsonwebtoken";

const protectCompany = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorised! Login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.company = await Company.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

export default protectCompany;
