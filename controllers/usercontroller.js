import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../sendEmail.js";

const forsignup = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please login" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const welcomeMail = `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff;">
    <div style=" padding: 10px; text-align: center;">
      <h1 style="color: #333333; height: 50px; width: 100%;">Welcome to Our Platform, ${fullname}!</h1>
      <img src="https://res.cloudinary.com/dresbq8tp/image/upload/v1752754492/blog_pictures/qelt2dquxjmigbhh8ywe.png" width="100px; height: 100px;" />
    </div>
      <ul style="background-color: #008080; padding: 20px; border-radius: 5px;">
        <li>We're glad to have you with us.</li>
        <li>Explore our features and enjoy your stay.</li>
      </ul>
      <div style="background-color: #003366; padding: 10px; border-radius: 5px; color: #ffffff;">
      <p>Thank you for registering. We are excited to have you on board.</p>
      <p>To get started, you can:</p>
      </div>
      <ul style="background-color: #008080; padding: 20px; border-radius: 5px;">
        <li>Complete your profile</li>
        <li>Explore our documentation</li>
        <li>Join our community forums</li>
      </ul>
      <div style="background-color: #003366; padding: 10px; border-radius: 5px; color: #ffffff;">
      <p>If you have any questions, feel free to reach out.</p>
      <p>Best regards,</p>
      <p>The Team</p>
      </div>
    </div>
    `;

    await sendEmail(newUser.email, "Welcome to Our Platform", welcomeMail);
    if (!newUser) {
      return res.status(400).json({ message: "User registration failed" });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const forlogin = async (req, res) => {
  let { email, password } = req.body;

  let checkEmail = await User.findOne({ email });

  if (!checkEmail) {
    return res.status(404).json({ message: "Email not found" });
  }

  let checkPassword = await bcrypt.compare(password, checkEmail.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  let token = jwt.sign(
    { id: checkEmail._id, email: checkEmail.email, role: checkEmail.role },
    process.env.SECRET_KEY,
    { expiresIn: "3h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3 * 60 * 60 * 1000, // 3 hours
  });

  res.status(200).json({ message: "Login successful" });
};

let forlogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

const getAllUsers = async (req, res) => {
  const myUsers = await User.find();

  if (!myUsers) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json(myUsers);
};

const get1user = async (req, res) => {
  let { id } = req.params;

  const oneUser = await User.findById(id);

  if (!oneUser) return res.status(404).json({ message: "No user found" });

  res.status(200).send(oneUser);
};

const del1user = async (req, res) => {
  let { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) return res.status(404).json({ message: "No user found" });

  res.status(200).json({ message: "User deleted successfuly" });
};

const update1user = async (req, res) => {
  let { id } = req.params;
  let newData = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });

  if (!updatedUser) return res.status(404).json({ message: "No user found" });

  res.status(200).json({ message: "User updated successfuly", updatedUser });
};

export { getAllUsers, get1user, del1user, update1user, forsignup, forlogin, forlogout };
