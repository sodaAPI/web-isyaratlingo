import Shop from "../models/shopModel.js";

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

export const createItem = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    await Shop.create({
      name: name,
      price: price,
      description: description,
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
    if (req.roles === "admin") {
      await Shop.update(
        {
          name: name,
          price: price,
          description: description,
        },
        {
          where: {
            uuid: shop.uuid,
          },
        }
      );
    } else {
      await Shop.update(
        {
          name: name,
          price: price,
          description: description,
        },
        {
          where: {
            uuid: shop.uuid,
          },
        }
      );
    }
    res.status(200).json({ msg: "Item Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

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
