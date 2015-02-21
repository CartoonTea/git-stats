module.exports = function (inputData, callback) {
  // run some functions on inputData
  // if error
  callback('something went wrong');
  // if no error
  callback(null, responseData);
};