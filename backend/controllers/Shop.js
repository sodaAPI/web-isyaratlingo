import Shop from "../models/shopModel.js";
import User from "../models/userModel.js";
import multer from "multer";
import * as path from "path";

export const getAllItems = async (req, res) => {
  try {
    const shop = await Shop.findAll();
    res.json(shop);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getItemByUUID = async (req, res) => {
  try {
    const shop = await Shop.findAll({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.json(shop[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const buyItem = async (req, res) => {
  const shop = await Shop.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (!shop) return res.status(404).json({ msg: "Item not found" });

  try {
    if (req.point >= shop.price) {
      // Increment the 'guard' field by 1
      await User.increment("guard", {
        by: 1,
        where: {
          uuid: req.userUUID,
        },
      });

      // Deduct the price from the user's points
      await User.update(
        {
          point: req.point - shop.price,
        },
        {
          where: {
            uuid: req.userUUID,
          },
        }
      );

      res.status(200).json({ msg: "Item Bought" });
    } else {
      res.status(400).json({ msg: "Not enough points to buy this item" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createItem = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    await Shop.create({
      name: name,
      price: price,
      description: description,
      image: req.file.path,
    });
    res.status(201).json({ msg: "Item Created Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateItem = async (req, res) => {
  const shop = await Shop.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!shop) return res.status(404).json({ msg: "Item not found" });
  const { name, price, description } = req.body;
  try {
    await Shop.update(
      {
        name: name,
        price: price,
        description: description,
        image: req.file.path, 
      },
      {
        where: {
          uuid: shop.uuid,
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
    cb(null, `public/image/shop`);
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

export const deleteItem = async (req, res) => {
  const shop = await Shop.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!shop) return res.status(404).json({ msg: "Item not found" });
  try {
    await Shop.destroy({
      where: {
        uuid: shop.uuid,
      },
    });
    res.status(200).json({ msg: "Item Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
