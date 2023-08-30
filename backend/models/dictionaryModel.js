import { Sequelize } from "sequelize";
import db from "../config/database.js";

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
  },
  {
    freezeTableName: true,
  }
);
await Dictionary.sync();
export default Dictionary;
