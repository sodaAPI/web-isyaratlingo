import Dictionary from "../models/dictionaryModel.js";
import multer from "multer";

import * as path from "path";

export const getAllVocabs = async (req, res) => {
  try {
    const vocab = await Dictionary.findAll();
    res.json(vocab);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getVocabByUUID = async (req, res) => {
  try {
    const vocab = await Dictionary.findAll({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.json(vocab[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createVocab = async (req, res) => {
  const { name, categories, src } = req.body;
  try {
    await Dictionary.create({
      name: name,
      image: req.file.path,
      categories: categories,
      src: src,
    });
    res.status(201).json({ msg: "Item Created Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateVocab = async (req, res) => {
  const vocab = await Dictionary.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!vocab) return res.status(404).json({ msg: "Item not found" });
  const { name, categories, src } = req.body;
  
  // Define an object to store the updated fields
  const updateFields = {};

  // Check if a new value is provided for each field and update it if not empty
  if (name !== undefined) {
    updateFields.name = name;
  } else {
    updateFields.name = vocab.name; // Use the existing name
  }

  if (categories !== undefined) {
    updateFields.categories = categories;
  } else {
    updateFields.categories = vocab.categories; // Use the existing categories
  }
  
  if (src !== undefined) {
    updateFields.src = src;
  } else {
    updateFields.src = vocab.src; // Use the existing src
  }

  try {
    if (req.roles === "admin") {
      if (req.file) {
        updateFields.image = req.file.path; // Set the image field only if req.file is provided
      } else {
        updateFields.image = vocab.image; // Use the existing image
      }
    } else {
      updateFields.image = vocab.image; // Use the existing image
    }

    await Dictionary.update(
      updateFields, // Use the defined updateFields object
      {
        where: {
          uuid: vocab.uuid,
        },
      }
    );

    res.status(200).json({ msg: "Item Updated" });
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
  return formattedDateTime.replace(/\//g, '-').replace(/:/g, '_').replace(/,/g, '-');
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/image/dictionary`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + " " + formatTimestamp(Date.now()) + path.extname(file.originalname));
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

export const deleteVocab = async (req, res) => {
  const vocab = await Dictionary.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!vocab) return res.status(404).json({ msg: "Item not found" });
  try {
    await Dictionary.destroy({
      where: {
        uuid: vocab.uuid,
      },
    });
    res.status(200).json({ msg: "Item Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
