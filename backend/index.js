import express from "express";
import pkg from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import bodyParser from "body-parser";
import { Server } from "socket.io";

import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ShopRoute from "./routes/ShopRoute.js";
import DictonaryRoute from "./routes/DictionaryRoute.js"

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

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Socket.io
const server = app.listen(process.env.APP_PORT, () =>
  console.log(`Server started on PORT ${process.env.APP_PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: process.env.URL_ORIGIN,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

// Sync Database
// (async () => {
//   await db.sync();
// })();
// store.sync();
