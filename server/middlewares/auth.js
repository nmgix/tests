const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // get jwt token from header
  const token = req.header("x-auth-token");

  // if token does not exist, error
  if (!token) {
    return res.status(401).json("Error occured");
  }

  // else decode jwt and reassign it's user (from payload) to req.user
  try {
    const decoded = jwt.verify(token, process.env.JWT_CONFIG);
    req.userId = decoded.id;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json("Error occured");
  }
};
