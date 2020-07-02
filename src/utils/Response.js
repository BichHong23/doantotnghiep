const CONSTANTS = require('./Constants');

module.exports.success = (data, msg) => {
   
  if (data == null) {
    return {
      status: CONSTANTS.CONSTANTS.HTTP.SUCCESS,
      msg
    };
  }

  if (Array.isArray(data)) {
    
    return {
      data,
      count: data.length,
      status: CONSTANTS.CONSTANTS.HTTP.SUCCESS,
      msg
    };
  }

  return {
    data,
    status: CONSTANTS.CONSTANTS.HTTP.SUCCESS,
    msg
  };
};

module.exports.error = msg => {
  return {
    status: CONSTANTS.CONSTANTS.HTTP.FAILURE,
    msg
  };
};
