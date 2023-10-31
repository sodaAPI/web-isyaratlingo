import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Learn from "./learnModel.js";
import Lesson from "./lessonModel.js";
import Level from "./levelModel.js";
import User from "./userModel.js";

const { DataTypes } = Sequelize;

const Dictionary = db.define(
  "dictionary",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    categories: {
      type: DataTypes.STRING,
    },
    src: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Learn.hasMany(Level, { foreignKey: "uuid", targetKey: "level_uuid" });
Lesson.hasMany(Level, { foreignKey: "uuid", targetKey: "level_uuid" });
Level.belongsTo(Learn, { foreignKey: "uuid", targetKey: "level_uuid" });
Level.belongsTo(Lesson, { foreignKey: "uuid", targetKey: "level_uuid" });



User.hasMany(Level, { foreignKey: "uuid", sourceKey: "progresslevel" });
User.hasMany(Learn, { foreignKey: "uuid", sourceKey: "progresslearn" });
User.hasMany(Lesson, { foreignKey: "uuid", sourceKey: "progresslesson" });

export default Dictionary;
