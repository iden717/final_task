const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const schema = Joi.object({
      fullname: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(10).max(50).required(),
      password: Joi.string().min(6).max(50).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "failed validation",
        message: error.details[0].message,
      });

    const findEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (findEmail)
      return res.status(400).send({
        status: "register failed",
        message: "Email already registered",
      });

    const hashStrength = 10;
    const hashPassword = await bcrypt.hash(password, hashStrength);

    const user = await User.create({
      ...req.body,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY
    );

    res.send({
      status: "success",
      data: {
        user: {
          email: user.email,
          fullname: user.fullname,
          token,
        },
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const schema = Joi.object({
      email: Joi.string().email().min(10).max(50).required(),
      password: Joi.string().min(6).max(50).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "failed validation",
        message: error.details[0].message,
      });

    const findEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (!findEmail)
      return res.status(400).send({
        status: "login failed",
        message: "Your credentials is not valid",
      });

    const isPassword = await bcrypt.compare(password, findEmail.password);

    if (!isPassword)
      return res.status(400).send({
        status: "login failed",
        message: "Your credentials is not valid",
      });

    const token = jwt.sign(
      {
        id: findEmail.id,
      },
      process.env.SECRET_KEY
    );

    res.send({
      status: "success",
      data: {
        user: {
          fullname: findEmail.fullname,
          email: findEmail.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).sen({
      status: "error",
      message: "Server Error",
    });
  }
};
exports.getCheckAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      where: {
        id: req.userId.id,
      },
    });

    res.send({
      status: "success",
      data: {
        user,
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
