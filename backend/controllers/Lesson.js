import Level from "../models/levelModel.js";
import Lesson from "../models/lessonModel.js";
import Learn from "../models/learnModel.js";
import multer from "multer";

import * as path from "path";

export const getAllLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findAll();
    res.json(lesson);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getLessonByUUID = async (req, res) => {
  try {
    const lesson = await Lesson.findAll({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.json(lesson[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createLesson = async (req, res) => {
  const {
    name,
    level_uuid,
    image,
    description,
    question_1,
    question_2,
    question_3,
    question_4,
    right_answer,
  } = req.body;
  try {
    await Lesson.create({
      name: name,
      level_uuid: level_uuid,
      image: req.file.path,
      description: description,
      question_1: question_1,
      question_2: question_2,
      question_3: question_3,
      question_4: question_4,
      right_answer: right_answer,
    });
    res.status(201).json({ msg: "Level Created Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateLesson = async (req, res) => {
  const lesson = await Lesson.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!lesson) return res.status(404).json({ msg: "Level not found" });
  const {
    name,
    level_uuid,
    image,
    description,
    question_1,
    question_2,
    question_3,
    question_4,
    right_answer,
  } = req.body;
  try {
    if (req.roles === "admin") {
      await Lesson.update(
        {
          name: name,
          level_uuid: level_uuid,
          image: req.file.path,
          description: description,
          question_1: question_1,
          question_2: question_2,
          question_3: question_3,
          question_4: question_4,
          right_answer: right_answer,
        },
        {
          where: {
            uuid: lesson.uuid,
          },
        }
      );
    } else {
      await Lesson.update(
        {
          name: name,
          level_uuid: level_uuid,
          image: req.file.path,
          description: description,
          question_1: question_1,
          question_2: question_2,
          question_3: question_3,
          question_4: question_4,
          right_answer: right_answer,
        },
        {
          where: {
            uuid: lesson.uuid,
          },
        }
      );
    }
    res.status(200).json({ msg: "Level Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteLesson = async (req, res) => {
  const lesson = await Lesson.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!lesson) return res.status(404).json({ msg: "Level not found" });
  try {
    await Lesson.destroy({
      where: {
        uuid: lesson.uuid,
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
    cb(null, `public/image/user`);
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
