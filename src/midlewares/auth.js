const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    res.status(400).send({
      status: "failed",
      message: "Access Denied",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "Invalid Token",
    });
  }
};
