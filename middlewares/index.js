import jwt from "jsonwebtoken";

const checkIsUserAuthenticated = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    try {
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);
      req.body.userId = userID;
      next();
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: "123unAuthorized user" });
    }
  } else {
    return res.status(401).json({ message: "unAuthorized User" });
  }
};

export default checkIsUserAuthenticated;
