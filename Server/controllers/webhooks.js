import { Webhook } from "svix";
import User from "../models/User.js";

//API controller function to manage clerk
export const clerkWebHooks = async (req, res) => {
  try {
    //CREATING svix instance with clerk webhook secret
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //verifying header
    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    //getting data from req body
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        return res.json({
          success: true,
          message: "User created successfully",
        });
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.json({
          success: true,
          message: "User updated successfully",
        });
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({
          success: true,
          message: "User deleted successfully",
        });
        break;
      }
      default: {
        return res.status(400).json({
          success: false,
          message: "Unknown event type",
        });
      }
    }
  } catch (error) {
    console.error("Clerk webhook errror");
    return res.status(500).json({
      success: false,
      message: "Clerk webhook or Internal server error",
      error: error.message,
    });
  }
};
