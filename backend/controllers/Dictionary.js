import Dictionary from "../models/dictionaryModel.js";

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
  const { name, image, categories } = req.body;
  try {
    await Dictionary.create({
      name: name,
      image: image,
      categories: categories,
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
  const { name, image, categories } = req.body;
  try {
    if (req.roles === "admin") {
      await Dictionary.update(
        {
          name: name,
          image: image,
          categories: categories,
        },
        {
          where: {
            uuid: vocab.uuid,
          },
        }
      );
    } else {
      await Dictionary.update(
        {
          name: name,
          image: image,
          categories: categories,
        },
        {
          where: {
            uuid: vocab.uuid,
          },
        }
      );
    }
    res.status(200).json({ msg: "Item Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

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
