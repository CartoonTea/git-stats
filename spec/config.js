var chai        = require('chai');
var assert      = chai.assert;
var expect      = chai.expect;
var should      = chai.should;

before(function (done) {
  global.assert = assert;
  global.expect = expect;
  global.should = should;

  done();
});