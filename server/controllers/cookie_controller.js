// const { Cookie } = require("express-session");

const cookieController = {};

// To handle setting cookies for OAUTH users
cookieController.setCookiesOAUTH = (req, res, next) => {
  res.cookie('logCode', 1);
  res.cookie('user', req.user.email, { maxAge: 30 * 60000, httpOnly: true });
  res.cookie('SSID', res.locals.jwtToken, { maxAge: 30 * 60000, httpOnly: true });
  return next();
}

// To handle setting cookies for traditional login users
cookieController.setCookiesBasic = (req, res, next) => {
  res.cookie('logCode', 1);
  res.cookie('user', res.locals.email, { maxAge: 30 * 60000, httpOnly: true });
  res.cookie('SSID', res.locals.jwtToken, { maxAge: 30 * 60000, httpOnly: true });
  return next();
}

cookieController.clearCookies = (req, res, next) => {
  res.clearCookie('logCode');
  return next();
}

module.exports = cookieController;