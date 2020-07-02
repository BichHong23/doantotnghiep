const DBinfo_Local = {
  HOST: "http://localhost:3000",
  DB_HOST: "localhost",
  DB_USER: "postgres",
  DB_PASS: "51302751",
  DB_NAME: "postgres",
  DB_PORT: 5432,
  DB_URI:
    "postgres://qvzvtjauhzropu:c087874943573c298d0a28c25e792e2f7b81c04fa54d7b6535f8cff7038acbf1@ec2-54-225-192-243.compute-1.amazonaws.com:5432/ddhdumkvmao8v3"
};

module.exports.DBINFO = {
  DB_CONNECTION: "mongodb://admin:123456@localhost:27017/admin",
  Local: DBinfo_Local
};
