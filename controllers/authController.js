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

        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
          expiresIn: "10m",
        });
        const link = `https://aseapp-19127165-19127423.herokuapp.com/api/auth/verify/${token}`;

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
            const token = jwt.sign(
              { userID: isUser._id },
              process.env.SECRET_KEY,
              {
                expiresIn: "1d",
              }
            );
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
      const isVerifiedEmail = await jwt.verify(token, process.env.SECRET_KEY);
      if (isVerifiedEmail) {
        const getUser = await authModel.findOne({
          email: isVerifiedEmail.email,
        });
        if (!getUser) {
          return res.status(400).json({ message: "user not found" });
        }
        getUser.verified = true;
        const saveEmail = await getUser.save();
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

  static changeInformation = async (req, res) => {
    try {
      const { userId, newName, newPassword } = req.body;

      const genSalt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(newPassword, genSalt);

      const user = await authModel.findOneAndUpdate(
        { _id: userId },
        { name: newName, password: hashedPassword },
        { new: true }
      );
      res.status(201).json({ success: true, userName: user.name });
    } catch (err) {
      res.status(500).json({ errorMessage: err.message ?? "Unknown error" });
    }
  };
}

export default authController;
