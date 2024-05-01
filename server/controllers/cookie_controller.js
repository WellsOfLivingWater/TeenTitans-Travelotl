// const { Cookie } = require("express-session");

const cookieController = {};

// To handle setting cookies for OAUTH users
cookieController.setCookiesOAUTH = (req, res, next) => {
  res.cookie('user', req.user.email, {httpOnly: true });
  res.cookie('SSID', res.locals.jwtToken, { httpOnly: true });
  return next();
}

// To handle setting cookies for traditional login users
cookieController.setCookiesBasic = (req, res, next) => {
  res.cookie('user', res.locals.email, {httpOnly: true });
  res.cookie('SSID', res.locals.jwtToken, { httpOnly: true });
  return next();
}

module.exports = cookieController;