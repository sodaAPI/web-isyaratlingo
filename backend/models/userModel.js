import Level from "./levelModel.js";
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "public/image/user/user-profile.png",
    },
    password: {
      type: DataTypes.STRING,
    },
    roles: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    token: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    point: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    progresslevel: {
      type: DataTypes.STRING,
    },
    progresslearn: {
      type: DataTypes.STRING,
    },
    progresslesson: {
      type: DataTypes.STRING,
    },
    winstreak: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    guard: {
      type: DataTypes.STRING,
      defaultValue: "1",
    },
  },
  {
    freezeTableName: true,
  }
);



export default User;
