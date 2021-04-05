const Joi = require("joi");
const { User } = require("../../models");

exports.updateUser = async (req, res) => {
  try {
    const { fullname } = req.body;

    const schema = Joi.object({
      fullname: Joi.string().min(5).max(50),
    });

    const { error } = await schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const findUser = await User.findOne({
      where: {
        id: req.userId.id,
      },
    });

    if (!findUser)
      return res.status(404).send({
        status: "failed",
        message: "User not found",
      });

    const updateData = await User.update(req.body, {
      where: {
        id: req.userId.id,
      },
    });

    res.send({
      status: "success",
      data: {
        user: updateData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const delUser = await User.destroy({
      where: {
        id: req.userId.id,
      },
    });

    res.send({
      status: "success",
      message: `Success delete user`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};
