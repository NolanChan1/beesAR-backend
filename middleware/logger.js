// Middleware that logs the request made and the IP it was made from
const moment = require("moment");

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()} from ${req.socket.remoteAddress}`
  );
  next();
};

module.exports = logger;
