import User from "../models/userModel.js";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import randtoken from "rand-token";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
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

export const createUser = async (req, res) => {
  const { name, email, age, password, confirmpassword, roles } = req.body;
  if (password !== confirmpassword)
    return res.status(400).json({
      msg: "Password and Confirmation Password do not match, Please try again.",
    });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      age: age,
      roles: roles,
      password: hashPassword,
    });
    res.status(201).json({ msg: "Register Successfully" });
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
  const { name, email, age, password, confirmpassword, roles } = req.body;
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
    if (req.roles === "admin") {
      await User.update(
        {
          name: name,
          email: email,
          age: age,
          password: hashPassword,
          roles: roles,
        },
        {
          where: {
            uuid: user.uuid,
          },
        }
      );
    } else {
      await User.update(
        {
          name: name,
          email: email,
          age: age,
          password: hashPassword,
        },
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
