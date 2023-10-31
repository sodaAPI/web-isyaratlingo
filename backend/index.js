import express from "express";
import path from "path";
import pkg from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

import Learn from "./models/learnModel.js";
import Lesson from "./models/lessonModel.js";
import Level from "./models/levelModel.js";
import User from "./models/userModel.js";
import Shop from "./models/shopModel.js";
import Dictionary from "./models/dictionaryModel.js";

import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ShopRoute from "./routes/ShopRoute.js";
import DictonaryRoute from "./routes/DictionaryRoute.js";
import LevelRoute from "./routes/LevelRoute.js";
import LearnRoute from "./routes/LearnRoute.js";
import LessonRoute from "./routes/LessonRoute.js";

dotenv.config();

const app = express();
app.disable("x-powered-by");
const cors = pkg;
const corsOptions = pkg;
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
  expiration: process.env.SESSION_EXPIRED * 60 * 60 * 1000,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      maxAge: process.env.SESSION_EXPIRED * 60 * 60 * 1000,
    },
  })
);

try {
  await db.authenticate();
  console.log("Database has been connected...");
} catch (error) {
  console.error("Connection error:", error);
}

app.use(
  cors({
    credentials: true,
    origin: process.env.URL_ORIGIN,
  })
);
app.use(express.json());
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/shop", ShopRoute);
app.use("/dictionary", DictonaryRoute);
app.use("/level", LevelRoute);
app.use("/learn", LearnRoute);
app.use("/lesson", LessonRoute);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
  try {
    await db.sync(); // Sync other models
    await Learn.sync();
    await Lesson.sync();
    await Level.sync();
    await User.sync();
    await Dictionary.sync();
    await Shop.sync();
    console.log("Models have been synchronized with the database...");
  } catch (error) {
    console.error("Error synchronizing models with the database:", error);
  }
})();

// Start the server
app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`Server started on PORT ${process.env.APP_PORT}`)
);
