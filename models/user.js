const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  login: String,
  password: String,
  name: String
});
userSchema.pre("save", next => {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});
userSchema.methods.comparePassword = password => {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", userSchema);
