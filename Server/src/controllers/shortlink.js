const Joi = require("joi");
const { Op } = require("sequelize");
const { Brand, Link } = require("../../models");
const brand = require("../../models/brand");
const URL = process.env.URL + "/uploads/";

exports.getBrands = async (req, res) => {
  try {
    const links = await Brand.findAll({
      include: {
        model: Link,
        as: "links",
        attributes: {
          exclude: ["updatedAt", "createdAt", "userId"],
        },
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "userId"],
      },
      where: {
        userId: req.userId.id,
      },
    });

    const brandString = JSON.stringify(links);
    const brandObject = JSON.parse(brandString);

    const finalBrand = brandObject.map((data) => ({
      ...data,
      image: data.image ? URL + data.image : null,
    }));
    res.send({
      status: "success",
      data: {
        links: finalBrand,
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
exports.getDetailBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const links = await Brand.findOne({
      include: {
        model: Link,
        as: "link",
        attributes: {
          exclude: ["createdAt", "updatedAt", "listLinkId", "listLinkId"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      where: {
        [Op.and]: [{ uniqueLink: id }, { userId: req.userId.id }],
      },
    });

    res.send({
      status: "success",
      data: {
        link,
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
exports.addBrand = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(5).max(50).required(),
      description: Joi.string().min(5).max(50).required(),
      image: Joi.allow(),
    });

    const { error } = await schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    let r = Math.random().toString(36).substring(7);

    const Createlink = await Brand.create({
      userId: req.userId.id,
      title: req.body.title,
      description: req.body.description,
      image: req.files.image ? req.files.image[0].filename : null,
      viewCount: 0,
      uniqueLink: r,
    });

    const findBrand = await Brand.findOne({
      attributes: {
        exclude: ["updatedAt", "createdAt", "userId"],
      },
      where: {
        id: Createlink.id,
      },
    });

    const brandString = JSON.stringify(findBrand);
    const brandObject = JSON.parse(brandString);

    const brandFinal = {
      ...brandObject,
      image: brandObject.image ? URL + brandObject.image : null,
    };

    res.send({
      status: "success",
      data: {
        link: brandFinal,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};
exports.addLink = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(5).max(50).required(),
      url: Joi.string().min(5).max(50).required(),
      uniqueBrand: Joi.string().min(3).max(15).required(),
      image: Joi.allow(),
    });

    const { error } = await schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const createLink = await Link.create({
      uniqueBrand: req.body.uniqueBrand,
      title: req.body.title,
      image: req.files.image ? req.files.image[0].filename : null,
      url: req.body.url,
    });

    const findBrand = await Brand.findOne({
      include: {
        model: Link,
        as: "links",
        attributes: {
          exclude: ["updatedAt", "createdAt", "userId"],
        },
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "userId"],
      },
      where: {
        uniqueLink: createLink.uniqueBrand,
      },
    });

    res.send({
      status: "success",
      data: {
        link: findBrand,
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

exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const findShort = await Brand.findOne({
      where: {
        id,
      },
    });

    if (!findShort)
      return res.status(404).send({
        status: "failed",
        message: "Link not found",
      });

    const deleteData = await Brand.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        user: deleteData,
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
