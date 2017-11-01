var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  local: {
    firstname: String,
    lastname: String,
    email: String,
    password: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
