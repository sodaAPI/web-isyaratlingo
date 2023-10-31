import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Learn from "./learnModel.js";
import Lesson from "./lessonModel.js";
import User from "./userModel.js";

const { DataTypes } = Sequelize;

const Level = db.define(
  "level",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    level: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);



export default Level;
