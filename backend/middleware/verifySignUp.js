import User from "../models/userModel.js";

export const checkDuplicateUsernameOrEmail = (req, res, next) => {
  
  // Name
  User.findOne({
    where: {
      name: req.body.name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Name is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

export const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

export default verifySignUp;
