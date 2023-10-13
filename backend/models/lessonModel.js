import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Lesson = db.define(
  "lesson",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    level_uuid: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    question_1: {
      type: DataTypes.STRING,
    },
    question_2: {
      type: DataTypes.STRING,
    },
    question_3: {
      type: DataTypes.STRING,
    },
    question_4: {
      type: DataTypes.STRING,
    },
    right_answer: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
await Lesson.sync();
export default Lesson;
