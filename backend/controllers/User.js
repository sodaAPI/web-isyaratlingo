import User from "../models/userModel.js";
import Level from "../models/levelModel.js";
import Learn from "../models/learnModel.js";
import Lesson from "../models/lessonModel.js";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import randtoken from "rand-token";
import multer from "multer";

import * as path from "path";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Level, // Include the Level model
          attributes: ["uuid", "level", "name"], // Specify the attributes you want to include
          as: "levels", // This should match the alias you defined in the association
        },
        {
          model: Learn, // Include the Learn model
          attributes: ["number", "name", "level_uuid",], // Specify the attributes you want to include
          as: "learns", // This should match the alias you defined in the association
        },
        {
          model: Lesson, // Include the Lesson model
          attributes: ["number", "name", "level_uuid", ], // Specify the attributes you want to include
          as: "lessons", // This should match the alias you defined in the association
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAllUserLeaderboard = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "score", "winstreak"],
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUserByUUID = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.json(user[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, age, password, confirmpassword } = req.body;

  // Set a default image path if req.file.path is not provided
  const imagePath = req.file ? req.file.path : "public/image/user/user-profile.png";
  
  if (password !== confirmpassword) {
    return res.status(400).json({
      msg: "Password and Confirmation Password do not match. Please try again.",
    });
  }
  
  const hashPassword = await argon2.hash(password);
  
  try {
    const user = await User.create({
      name: name,
      email: email,
      image: imagePath, // Use the imagePath variable here
      age: age,
      password: hashPassword,
    });
    
    // Find the level with level = 1
    const initialLevel = await Level.findOne({ where: { level: 1 } });
    
    // Find the initial learn with number = 1 and level_uuid = user's initial level
    const initialLearn = await Learn.findOne({
      where: { number: 1, level_uuid: initialLevel.uuid },
    });
    
    // Find the initial lesson with number = 1 and level_uuid = user's initial level
    const initialLesson = await Lesson.findOne({
      where: { number: 1, level_uuid: initialLevel.uuid },
    });
    
    // Update the user's progress
    user.progresslevel = initialLevel.uuid;
    user.progresslearn = initialLearn.uuid;
    user.progresslesson = initialLesson.uuid;
    
    // Save the updated user
    await user.save();

    res.status(201).json({ msg: "Register Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    name,
    email,
    age,
    password,
    confirmpassword,
    roles,
    score,
    point,
    winstreak,
    guard,
  } = req.body;

  // Set a default image path if req.file.path is not provided
  const imagePath = req.file ? req.file.path : "public/image/user/user-profile.png";

  if (password !== confirmpassword) {
    return res.status(400).json({
      msg: "Password and Confirmation Password do not match, Please try again.",
    });
  }

  const hashPassword = await argon2.hash(password);

  try {
    const user = await User.create({
      name: name,
      email: email,
      image: imagePath, // Use the imagePath variable here
      age: age,
      password: hashPassword,
      roles: roles,
      score: score,
      point: point,
      winstreak: winstreak,
      guard: guard,
    });

    // Find the level with level = 1
    const initialLevel = await Level.findOne({ where: { level: 1 } });

    // Find the initial learn with number = 1 and level_uuid = user's initial level
    const initialLearn = await Learn.findOne({
      where: { number: 1, level_uuid: initialLevel.uuid },
    });

    // Find the initial lesson with number = 1 and level_uuid = user's initial level
    const initialLesson = await Lesson.findOne({
      where: { number: 1, level_uuid: initialLevel.uuid },
    });

    // Update the user's progress
    user.progresslevel = initialLevel.uuid;
    user.progresslearn = initialLearn.uuid;
    user.progresslesson = initialLesson.uuid;

    // Save the updated user
    await user.save();

    res.status(201).json({ msg: "User Created Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user)
    return res
      .status(404)
      .json({ msg: "Email not recognized, Please try again." });
  const token = randtoken.generate(20);
  try {
    await User.update(
      {
        token: token,
        tokenExpires: Date.now() + 10 * 60 * 1000, // Token will be valid for 10 minutes (10 * 60 * 1000 ms)
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );
    const transporter = nodemailer.createTransport({
      secure: true,
      host: `${process.env.EMAIL_HOST}`,
      port: `${process.env.EMAIL_PORT}`,
      auth: {
        user: `${process.env.EMAIL_API}`,
        pass: `${process.env.PASSWORD_API}`,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    let message = `
    <html>
      <body>
        <h1>Hello ${user.name},</h1>
        <p>This email is from Isyaratlingo.</p>
        <p>We have noticed that you have requested to reset your password. If you did not make this request, please ignore this email.</p>
        <p>To reset your password, please click the link below. The link will be valid for 10 minutes:</p>
        <p><a href="${process.env.URL_ORIGIN}/reset-password/${token}">Click Here to Reset Your Password</a></p>
        <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
        <p>Thank you,</p>
        <p>The Isyaratlingo Team</p>
      </body>
    </html>
  `;

    transporter
      .sendMail({
        from: `${process.env.EMAIL_API}`,
        to: `${req.body.email}`,
        subject: "Password Reset - Isyaratlingo",
        html: message,
      })
      .then(console.info)
      .catch(console.error);

    res.status(200).json({ msg: "Email sent" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const user = await User.findOne({
    where: {
      token: req.params.token,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const { password, confirmpassword } = req.body;
  if (password !== confirmpassword)
    return res.status(400).json({
      msg: "Password and Confirmation Password do not match, Please try again.",
    });
  const hashPassword = await argon2.hash(password);
  const token = randtoken.generate(20);
  try {
    await User.update(
      {
        password: hashPassword,
        token: token,
      },
      {
        where: {
          uuid: user.uuid,
        },
      }
    );
    res.status(200).json({ msg: "Password Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const {
    name,
    email,
    age,
    password,
    confirmpassword,
    roles,
    score,
    point,
    winstreak,
    guard,
  } = req.body;

  // Initialize hashPassword with the existing user password
  let hashPassword = user.password;

  // Check if a new password is provided and hash it
  if (password) {
    if (password === confirmpassword) {
      hashPassword = await argon2.hash(password);
    } else {
      return res.status(400).json({
        msg: "Password and Confirmation Password do not match, Please try again.",
      });
    }
  }

  try {
    const updateFields = {
      name: name || user.name, // Use the existing name if not provided
      email: email || user.email, // Use the existing email if not provided
      age: age || user.age, // Use the existing age if not provided
      password: hashPassword, // Use the hashed password
      roles: roles || user.roles, // Use the existing roles if not provided
      score: score || user.score, // Use the existing score if not provided
      point: point || user.point, // Use the existing point if not provided
      winstreak: winstreak || user.winstreak, // Use the existing winstreak if not provided
      guard: guard || user.guard, // Use the existing guard if not provided
    };

    // Set the image field only if req.file is provided
    if (req.file) {
      updateFields.image = req.file.path;
    }

    if (req.roles === "admin") {
      await User.update(
        updateFields,
        {
          where: {
            uuid: user.uuid,
          },
        }
      );
    } else {
      await User.update(
        updateFields,
        {
          where: {
            uuid: user.uuid,
          },
        }
      );
    }
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};



export const updateUserPassword = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const { password, confirmpassword } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confirmpassword)
    return res.status(400).json({
      msg: "Password and Confirmation Password do not match, Please try again.",
    });
  try {
    await User.update(
      {
        password: hashPassword,
      },
      {
        where: {
          uuid: user.uuid,
        },
      }
    );

    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  try {
    const { name, email, age } = req.body;

    // Create an object to store the updated profile information
    const updatedProfile = {};

    // Check if the fields are provided in the request and update the user's profile accordingly
    if (name) {
      updatedProfile.name = name;
    }
    if (req.file && req.file.path) {
      updatedProfile.image = req.file.path;
    }
    if (email) {
      updatedProfile.email = email;
    }
    if (age) {
      updatedProfile.age = age;
    }

    // Update the user's profile with the provided or existing values
    await User.update(updatedProfile, {
      where: {
        uuid: user.uuid,
      },
    });

    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await User.destroy({
      where: {
        uuid: user.uuid,
      },
    });
    res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const formatTimestamp = (timestamp) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };
  const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
    new Date(timestamp)
  );

  // Replace slashes with hyphens and spaces with underscores
  return formattedDateTime
    .replace(/\//g, "-")
    .replace(/:/g, "_")
    .replace(/,/g, "-");
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/image/user`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname +
        " " +
        formatTimestamp(Date.now()) +
        path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: "2000000" }, //2MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");
