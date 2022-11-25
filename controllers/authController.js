import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailtoUser } from "../config/EmailTemplate.js";

class authController {
  static userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const isUser = await authModel.findOne({ email: email });
      if (isUser) {
        res.status(201).json({ message: "User already exists" });
      } else {
        const genSalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, genSalt);

        const secretKey = "random string";
        const token = jwt.sign({ email: email }, secretKey, {
          expiresIn: "10m",
        });
        const link = `http://localhost:5000/api/auth/verify/${token}`;

        sendEmailtoUser(link, email);

        const newUser = authModel({
          name,
          email,
          password: hashedPassword,
          verified: false,
        });
        const resUser = newUser.save();
        if (resUser) {
          return res
            .status(201)
            .json({ message: "Successfully registered", user: resUser });
        }
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const isUser = await authModel.findOne({ email: email });
      if (isUser) {
        const user = await authModel.findById(isUser._id);
        if (user.verified) {
          if (
            email === isUser.email &&
            (await bcryptjs.compare(password, isUser.password))
          ) {
            const token = jwt.sign({ userID: isUser._id }, "random string", {
              expiresIn: "1h",
            });
            return res.status(201).json({
              message: "Successfully login",
              token,
              name: isUser.name,
            });
          } else {
            return res.status(201).json({ message: "Invalid credentials" });
          }
        } else {
          return res.status(201).json({ message: "Email activation pending" });
        }
      } else {
        return res.status(201).json({ message: "User not registered!" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static saveVerifiedEmail = async (req, res) => {
    const { token } = req.params;
    if (token) {
      const secretKey = "random string";
      const isVerifiedEmail = await jwt.verify(token, secretKey);
      if (isVerifiedEmail) {
        const getUser = await authModel.findOne({
          email: isVerifiedEmail.email,
        });
        const saveEmail = await authModel.findByIdAndUpdate(getUser._id, {
          $set: {
            verified: true,
          },
        });
        if (saveEmail) {
          return res
            .status(400)
            .json({ message: "Email activation successfully" });
        }
      } else {
        return res.status(400).json({ message: "Link expired" });
      }
    } else {
      return res.status(400).json({ message: "Invalid URL" });
    }
  };
}

export default authController;
