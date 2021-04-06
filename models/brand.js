"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Brand.hasMany(models.Link, {
        as: "links",
        sourceKey: "uniqueLink",
        foreignKey: "uniqueBrand",
      });
    }
  }
  Brand.init(
    {
      uniqueLink: { type: DataTypes.STRING, unique: true },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      viewCount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );
  return Brand;
};
