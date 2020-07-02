const jwt = require("express-jwt");

const getTokenFromHeaders = req => {
  // console.log(req);
  if (req && req.cookies && req.cookies.access_token) {
    return req.cookies.access_token;
  }

  if (req && req.session && req.session.access_token) {
    return req.session.access_token;
  }

  return null;
};

const auth = {
  required: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders
    // credentialsRequired: false
  }),
  optional: jwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

module.exports = auth;
