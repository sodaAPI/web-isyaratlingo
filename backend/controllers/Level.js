import Level from "../models/levelModel.js";
import Lesson from "../models/lessonModel.js";
import Learn from "../models/learnModel.js";
import User from "../models/userModel.js";

export const getUserLevel = async (req, res) => {
  const userId = req.user.uuid; // Assuming you have a middleware that attaches the user object to req
  try {
    const user = await User.findOne({
      where: {
        uuid: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user's progresslevel is not null
    if (user.progresslevel !== null) {
      // User has a progresslevel, retrieve the user's level based on progresslevel
      const userLevel = await Level.findOne({
        where: {
          uuid: user.progresslevel,
        },
      });

      if (!userLevel) {
        return res.status(404).json({ message: "User's Level not found" });
      }

      // Retrieve the associated levels for Learn.level_uuid and Lesson.level_uuid
      const learnLevel = await Level.findOne({
        where: {
          uuid: userLevel.level_uuid_learn,
        },
      });

      const lessonLevel = await Level.findOne({
        where: {
          uuid: userLevel.level_uuid_lesson,
        },
      });

      res.json({
        userLevel: userLevel,
        learnLevel: learnLevel,
        lessonLevel: lessonLevel,
      });
    } else {
      // User's progresslevel is null, set it to a default level (e.g., Level 1)
      const defaultLevel = await Level.findOne({
        where: {
          level: 1, // Set to the desired default level number
        },
      });

      if (!defaultLevel) {
        return res.status(404).json({ message: "Default Level not found" });
      }

      // Update the user's progresslevel to the default level
      await User.update(
        {
          progresslevel: defaultLevel.uuid,
        },
        {
          where: {
            uuid: userId,
          },
        }
      );

      // Retrieve the associated levels for Learn.level_uuid and Lesson.level_uuid
      const learnLevel = await Level.findOne({
        where: {
          uuid: defaultLevel.level_uuid_learn,
        },
      });

      const lessonLevel = await Level.findOne({
        where: {
          uuid: defaultLevel.level_uuid_lesson,
        },
      });

      res.json({
        userLevel: defaultLevel,
        learnLevel: learnLevel,
        lessonLevel: lessonLevel,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserLearn = async (req, res) => {
  const userId = req.user.uuid; // Assuming you have a middleware that attaches the user object to req

  try {
    const user = await User.findOne({
      where: {
        uuid: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user's progresslearn is not null
    if (user.progresslearn !== null) {
      // User has progresslearn, retrieve the user's learn progress based on progresslearn
      const learnProgress = await Learn.findOne({
        where: {
          uuid: user.progresslearn,
        },
      });

      if (!learnProgress) {
        return res.status(404).json({ message: "Learn progress not found" });
      }

      res.json({ userLearn: learnProgress });
    } else {
      // User's progresslearn is null, set it to a default Learn level (e.g., Learn level with Level 1)
      const defaultLevel = await Level.findOne({
        where: {
          level: 1, // Set to the desired default level number
        },
      });

      if (!defaultLevel) {
        return res.status(404).json({ message: "Default Learn Level not found" });
      }

      // Create a new learn progress entry for the default level
      const defaultLearnProgress = await Learn.create({
        level_uuid: defaultLevel.uuid,
        // You can set other properties here as needed
      });

      // Update the user's progresslearn to the default learn progress entry
      await User.update(
        {
          progresslearn: defaultLearnProgress.uuid,
        },
        {
          where: {
            uuid: userId,
          },
        }
      );

      res.json({ userLearn: defaultLearnProgress });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserLesson = async (req, res) => {
  const userId = req.user.uuid; // Assuming you have a middleware that attaches the user object to req

  try {
    const user = await User.findOne({
      where: {
        uuid: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user's progresslesson is not null
    if (user.progresslesson !== null) {
      // User has progresslesson, retrieve the user's lesson progress based on progresslesson
      const lessonProgress = await Lesson.findOne({
        where: {
          uuid: user.progresslesson,
        },
      });

      if (!lessonProgress) {
        return res.status(404).json({ message: "Lesson progress not found" });
      }

      res.json({ userLesson: lessonProgress });
    } else {
      // User's progresslesson is null, set it to a default Lesson level (e.g., Lesson level with Level 1)
      const defaultLevel = await Level.findOne({
        where: {
          level: 1, // Set to the desired default level number
        },
      });

      if (!defaultLevel) {
        return res.status(404).json({ message: "Default Lesson Level not found" });
      }

      // Create a new lesson progress entry for the default level
      const defaultLessonProgress = await Lesson.create({
        level_uuid: defaultLevel.uuid,
        // You can set other properties here as needed
      });

      // Update the user's progresslesson to the default lesson progress entry
      await User.update(
        {
          progresslesson: defaultLessonProgress.uuid,
        },
        {
          where: {
            uuid: userId,
          },
        }
      );

      res.json({ userLesson: defaultLessonProgress });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllLevels = async (req, res) => {
  try {
    // Perform a JOIN operation between Learn and Lesson tables using the Level table as a reference
    const levels = await Level.findAll({
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

    res.json(levels);
  } catch (error) {
    res.json({ message: error.message });
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
