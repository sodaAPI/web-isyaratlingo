import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Level from "./levelModel.js";

const { DataTypes } = Sequelize;

const Learn = db.define(
  "learn",
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
      allowNull: false, // Ensure it's not null
    },
    image: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);


export default Learn;
