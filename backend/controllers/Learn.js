import Level from "../models/levelModel.js";
import Lesson from "../models/lessonModel.js";
import Learn from "../models/learnModel.js";
import multer from "multer";

import * as path from "path";

export const getAllLearn = async (req, res) => {
  try {
    const learn = await Learn.findAll();
    res.json(learn);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getLearnByUUID = async (req, res) => {
  try {
    const learn = await Learn.findAll({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.json(learn[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createLearn = async (req, res) => {
  const { name, level_uuid, number, description } = req.body;
  try {
    // Check if a Learn with the same number and level_uuid already exists
    const existingLearn = await Learn.findOne({
      where: { number: number, level_uuid: level_uuid },
    });

    if (existingLearn) {
      return res.status(400).json({ msg: "A Learn with the same number already exists for this level." });
    }

    // If no existing Learn with the same number and level_uuid, create a new one
    await Learn.create({
      name: name,
      level_uuid: level_uuid,
      image: req.file.path,
      number: number,
      description: description,
    });
    res.status(201).json({ msg: "Learn Created Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};



export const updateLearn = async (req, res) => {
  const learn = await Learn.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!learn) return res.status(404).json({ msg: "Level not found" });
  const { name, level_uuid, number, description } = req.body;
  try {
    if (req.roles === "admin") {
      await Learn.update(
        {
          name: name,
          level_uuid: level_uuid,
          image: req.file.path,
          number : number,
          description: description,
        },
        {
          where: {
            uuid: learn.uuid,
          },
        }
      );
    } else {
      await Learn.update(
        {
          name: name,
          level_uuid: level_uuid,
          image: req.file.path,
          number : number,
          description: description,
        },
        {
          where: {
            uuid: learn.uuid,
          },
        }
      );
    }
    res.status(200).json({ msg: "Level Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteLearn = async (req, res) => {
  const learn = await Learn.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!learn) return res.status(404).json({ msg: "Level not found" });
  try {
    await Learn.destroy({
      where: {
        uuid: learn.uuid,
      },
    });
    res.status(200).json({ msg: "Level Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const formatTimestamp = (timestamp) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };
  const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
    new Date(timestamp)
  );

  // Replace slashes with hyphens and spaces with underscores
  return formattedDateTime
    .replace(/\//g, "-")
    .replace(/:/g, "_")
    .replace(/,/g, "-");
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/image/learning`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname +
        " " +
        formatTimestamp(Date.now()) +
        path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: "2000000" }, //2MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");
