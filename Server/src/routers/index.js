const express = require("express");

const { login, register, getCheckAuth } = require("../controllers/auth");
const {
  getBrands,
  addBrand,
  getDetailBrand,
  deleteBrand,
  addLink,
} = require("../controllers/shortlink");

const { updateUser, deleteUser } = require("../controllers/user");
const { checkAuth } = require("../midlewares/auth");
const { uploadFile } = require("../midlewares/uploadFile");

const route = express.Router();

route.post("/login", login);
route.post("/register", register);
route.get("/check-auth", checkAuth, getCheckAuth);

route.get("/brands", checkAuth, getBrands);
route.post("/brand", checkAuth, uploadFile("image"), addBrand);
route.get("/brand/:id", getDetailBrand);
route.delete("/brand/:id", checkAuth, deleteBrand);

route.post("/links", checkAuth, uploadFile("image"), addLink);

route.patch("/user", checkAuth, updateUser);
route.delete("/user", checkAuth, deleteUser);

module.exports = route;
