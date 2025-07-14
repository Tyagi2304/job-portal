import jwt from "jsonwebtoken";

const generateToken = (id) => {
  //adding id and jwt secret
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

export default generateToken;
