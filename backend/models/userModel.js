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
      defaultValue: "0",
    },
    winstreak: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    guard: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);
await User.sync();
export default User;