import Level from "../models/levelModel.js";
import Lesson from "../models/lessonModel.js";
import Learn from "../models/learnModel.js";
import User from "../models/userModel.js";

Lesson.belongsTo(Level, { foreignKey: "level_uuid" });
Learn.belongsTo(Level, { foreignKey: "level_uuid" });

Level.hasMany(Learn, { foreignKey: "level_uuid" });
Level.hasMany(Lesson, { foreignKey: "level_uuid" });

export const getNextLearnSession = async (req, res) => {
  const userUUID = req.userUUID;

  try {
    const user = await User.findOne({
      where: {
        uuid: userUUID,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.progresslevel) {
      return res.status(400).json({ message: "User's progress level not set" });
    }

    const userLevel = await Level.findOne({
      where: {
        uuid: user.progresslevel,
      },
    });

    if (!userLevel) {
      return res.status(404).json({ message: "User's Level not found" });
    }

    if (!user.progresslearn) {
      return res.status(400).json({ message: "User's progress learn not set" });
    }

    const currentLearn = await Learn.findOne({
      where: {
        uuid: user.progresslearn,
      },
    });

    if (!currentLearn) {
      return res
        .status(404)
        .json({ message: "User's current Learn session not found" });
    }

    // Convert currentLearn.number to a number
    const currentNumber = parseInt(currentLearn.number, 10);

    const nextLearnSession = await Learn.findOne({
      where: {
        level_uuid: userLevel.uuid,
        number: currentNumber + 1,
      },
    });

    if (!nextLearnSession) {
      return res.json({
        message: "No more sessions found for the current level.",
      });
    }

    // Update the user's progress learn to the next session
    await User.update(
      {
        progresslearn: nextLearnSession.uuid,
      },
      {
        where: {
          uuid: userUUID,
        },
      }
    );

    res.json({ message: "Next learn session retrieved.", nextLearnSession });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNextLessonSession = async (req, res) => {
  const userUUID = req.userUUID;

  try {
    const user = await User.findOne({
      where: {
        uuid: userUUID,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.progresslevel) {
      return res.status(400).json({ message: "User's progress level not set" });
    }

    const userLevel = await Level.findOne({
      where: {
        uuid: user.progresslevel,
      },
    });

    if (!userLevel) {
      return res.status(404).json({ message: "User's Level not found" });
    }

    if (!user.progresslearn) {
      return res.status(400).json({ message: "User's progress learn not set" });
    }

    const currentLesson = await Lesson.findOne({
      where: {
        uuid: user.progresslesson,
      },
    });

    if (!currentLesson) {
      return res
        .status(404)
        .json({ message: "User's current Lesson session not found" });
    }

    // Convert currentLesson.number to a number
    const currentNumber = parseInt(currentLesson.number, 10);

    const nextLessonSession = await Lesson.findOne({
      where: {
        level_uuid: userLevel.uuid,
        number: currentNumber + 1,
      },
    });

    const currentLevel = parseInt(userLevel.level, 10);

    if (!nextLessonSession) {
      const nextLevel = await Level.findOne({
        where: {
          level: currentLevel + 1,
        },
      });

      if (!nextLevel) {
        return res.json({
          message: "No more sessions found for the current level.",
        });
      }

      // Update the user's progress level to the next level
      await User.update(
        {
          progresslevel: nextLevel.uuid,
        },
        {
          where: {
            uuid: userUUID,
          },
        }
      );

      // Get the next learn session associated with the next level
      const nextLearnSession = await Learn.findOne({
        where: {
          level_uuid: nextLevel.uuid,
        },
      });

      if (!nextLearnSession) {
        return res.json({
          message: "No more learn sessions found for the next level.",
        });
      }

      // Update the user's progress learn to the next learn session
      await User.update(
        {
          progresslearn: nextLearnSession.uuid,
        },
        {
          where: {
            uuid: userUUID,
          },
        }
      );

      // Get the next lesson session associated with the next level
      const nextLessonSession = await Lesson.findOne({
        where: {
          level_uuid: nextLevel.uuid,
        },
      });

      if (!nextLessonSession) {
        return res.json({
          message: "No more lesson sessions found for the next level.",
        });
      }

      // Update the user's progress lesson to the next lesson session
      await User.update(
        {
          progresslesson: nextLessonSession.uuid,
        },
        {
          where: {
            uuid: userUUID,
          },
        }
      );

      return res.json({
        message: "User level, learn and lesson updated to the next level",
      });
    }

    // Update the user's progress learn to the next session
    await User.update(
      {
        progresslesson: nextLessonSession.uuid,
      },
      {
        where: {
          uuid: userUUID,
        },
      }
    );

    res.json({ message: "Next lesson session retrieved.", nextLessonSession });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.findAll({
      include: [
        {
          model: Learn, // Include the Learn model
          attributes: [
            "uuid",
            "number",
            "name",
            "level_uuid",
            "image",
            "description",
          ],
          as: "learns",
        },
        {
          model: Lesson, // Include the Lesson model
          attributes: [
            "uuid",
            "number",
            "name",
            "level_uuid",
            "image",
            "description",
            "question_1",
            "question_2",
            "question_3",
            "question_4",
            "right_answer",
          ],
          as: "lessons",
        },
      ],
    });

    if (levels) {
      res.json(levels);
    } else {
      res.status(404).json({ message: "No levels found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLevelByUUID = async (req, res) => {
  try {
    const level = await Level.findOne({
      where: {
        uuid: req.params.uuid,
      },
      include: [
        {
          model: Learn,
          required: true,
          where: {
            level_uuid: Level.col("uuid"), // Match Learn.level_uuid with Level.uuid
          },
        },
        {
          model: Lesson,
          required: true,
          where: {
            level_uuid: Level.col("uuid"), // Match Lesson.level_uuid with Level.uuid
          },
        },
      ],
    });

    if (!level) {
      res.status(404).json({ message: "Level not found" });
    } else {
      res.json(level);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createLevel = async (req, res) => {
  const { level, name } = req.body;
  try {
    await Level.create({
      level: level,
      name: name,
    });
    res.status(201).json({ msg: "Level Created Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateLevel = async (req, res) => {
  const vocab = await Level.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!vocab) return res.status(404).json({ msg: "Level not found" });
  const { level, name } = req.body;
  try {
    if (req.roles === "admin") {
      await Level.update(
        {
          level: level,
          name: name,
        },
        {
          where: {
            uuid: vocab.uuid,
          },
        }
      );
    } else {
      await Level.update(
        {
          level: level,
          name: name,
        },
        {
          where: {
            uuid: vocab.uuid,
          },
        }
      );
    }
    res.status(200).json({ msg: "Level Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteLevel = async (req, res) => {
  const vocab = await Level.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!vocab) return res.status(404).json({ msg: "Level not found" });
  try {
    await Level.destroy({
      where: {
        uuid: vocab.uuid,
      },
    });
    res.status(200).json({ msg: "Level Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
