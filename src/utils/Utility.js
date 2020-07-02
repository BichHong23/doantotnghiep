const cheerio = require("cheerio");
const rp = require("request-promise");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const getPageContent = uri => {
  const options = {
    uri,
    encoding: "utf8",
    headers: {
      "User-Agent": "Request-Promise"
    },
    transform: body => cheerio.load(body)
  };

  return rp(options);
};

module.exports.getPageContent = getPageContent;

module.exports.generateJWT = function(id) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    'secret'
  );
};
