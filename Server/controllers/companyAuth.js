import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";

//Register a new company
export const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file; //from multer

    if (!name || !email || !password || !imageFile) {
      return res.status(203).json({
        success: false,
        message: "Missing details",
      });
    }
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.status(203).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    //encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imageUpload;
    try {
      imageUpload = await cloudinary.uploader.upload(imageFile.path);
    } catch (error) {
      console.log("Cloudinary upload failed", error);

      return res.status(400).json({
        success: false,
        message: "Image upload failed. Use a valid image format",
      });
    }

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      imagePublicId: imageUpload.public_id,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        password: company.password,
        image: company.image,
        imagePublicId: company.imagePublicId,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.log("Error while registering company details");
    return res.status(500).json({
      success: false,
      message: "Internal server error! Can't register company details",
    });
  }
};

//Company Login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(203).json({
        success: false,
        message: "Invalid credentials! User doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, company.password);

    if (!isPasswordCorrect) {
      return res.status(203).json({
        success: false,
        message: "Invalid credentials! Incorrect password",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User is authorized and successfully logged in",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
        imagePublicId: company.imagePublicId,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.log(("Login error", error.message));

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again",
    });
  }
};
