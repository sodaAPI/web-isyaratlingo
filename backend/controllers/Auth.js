import User from "../models/userModel.js";
import Level from "../models/levelModel.js";
import argon2 from "argon2";
import Learn from "../models/learnModel.js";
import Lesson from "../models/lessonModel.js";

export const Login = async (req, res) => {
  // Check if user is already logged in
  if (req.session.userId) {
    return res.status(400).json({ msg: "You are already logged in" });
  }
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user)
    return res.status(404).json({ msg: "User not found, Please try again" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(400).json({ msg: "Wrong Password, Please try again" });
  req.session.userId = user.id;
  res.status(200).json({ msg: "You've logged" });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account" });
  }

  try {
    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
      include: [
        {
          model: Level, // Include the Level model
          attributes: ["uuid", "level", "name"], // Specify the attributes you want to include
          as: "levels", // This should match the alias you defined in the association
        },
        {
          model: Learn, // Include the Learn model
          attributes: ["uuid","number", "name", "level_uuid", "image", "description"], // Specify the attributes you want to include
          as: "learns", // This should match the alias you defined in the association
        },
        {
          model: Lesson, // Include the Lesson model
          attributes: ["uuid","number", "name", "level_uuid", "image", "description", "question_1", "question_2", "question_3", "question_4", "right_answer"], // Specify the attributes you want to include
          as: "lessons", // This should match the alias you defined in the association
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found, Please try again" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(400)
        .json({ msg: "You cannot logout, please contact the administrator" });
    res.status(200).json({ msg: "You've been logout" });
  });
};
