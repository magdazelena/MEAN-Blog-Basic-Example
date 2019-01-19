/* ===================
   Import Node Modules
=================== */
const mongoose = require("mongoose"); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// User Model Definition
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  blog: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  category: {
    type: String,
    required: true
  }
});

// // Schema Middleware to Encrypt Password
// blogSchema.pre("save", function(next) {
//   // Ensure password is new or modified before applying encryption
//   if (!this.isModified("password")) return next();

//   // Apply encryption
//   bcrypt.hash(this.password, null, null, (err, hash) => {
//     if (err) return next(err); // Ensure no errors
//     this.password = hash; // Apply encryption to password
//     next(); // Exit middleware
//   });
// });

// Export Module/Schema
module.exports = mongoose.model("Blog", blogSchema);
