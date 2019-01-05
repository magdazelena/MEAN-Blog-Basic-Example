/* ===================
   Import Node Modules
=================== */
const mongoose = require("mongoose"); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require("bcrypt-nodejs"); // A native JS bcrypt library for NodeJS

// Validate Function to check e-mail length
let loginLengthChecker = login => {
  // Check if e-mail exists
  if (!login) {
    return false; // Return error
  } else {
    // Check the length of e-mail string
    if (login.length < 5 || login.length > 30) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

// Validate Function to check if valid e-mail format
let validloginChecker = login => {
  // Check if e-mail exists
  if (!login) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regExp.test(login); // Return regular expression test results (true or false)
  }
};

// Array of login Validators
const loginValidators = [
  // First login Validator
  {
    validator: loginLengthChecker,
    message: "E-mail must be at least 5 characters but no more than 30"
  },
  // Second login Validator
  {
    validator: validloginChecker,
    message: "Must be a valid e-mail"
  }
];

// Validate Function to check name length
let nameLengthChecker = name => {
  // Check if name exists
  if (!name) {
    return false; // Return error
  } else {
    // Check length of name string
    if (name.length < 3 || name.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid name
    }
  }
};

// Validate Function to check if valid name format
let validname = name => {
  // Check if name exists
  if (!name) {
    return false; // Return error
  } else {
    // Regular expression to test if name format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(name); // Return regular expression test result (true or false)
  }
};

// Array of name validators
const nameValidators = [
  // First name validator
  {
    validator: nameLengthChecker,
    message: "name must be at least 3 characters but no more than 15"
  },
  // Second name validator
  {
    validator: validname,
    message: "name must not have any special characters"
  }
];

// Validate Function to check password length
let passwordLengthChecker = password => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 35) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Validate Function to check if valid password format
let validPassword = password => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Regular Expression to test if password is valid format
    const regExp = new RegExp(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
    );
    return regExp.test(password); // Return regular expression test result (true or false)
  }
};

// Array of Password validators
const passwordValidators = [
  // First password validator
  {
    validator: passwordLengthChecker,
    message: "Password must be at least 8 characters but no more than 35"
  },
  // Second password validator
  {
    validator: validPassword,
    message:
      "Must have at least one uppercase, lowercase, special character, and number"
  }
];

// User Model Definition
const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: loginValidators
  },
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: nameValidators
  },
  password: { type: String, required: true, validate: passwordValidators }
});

// Schema Middleware to Encrypt Password
userSchema.pre("save", function(next) {
  // Ensure password is new or modified before applying encryption
  if (!this.isModified("password")) return next();

  // Apply encryption
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err); // Ensure no errors
    this.password = hash; // Apply encryption to password
    next(); // Exit middleware
  });
});

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

// Export Module/Schema
module.exports = mongoose.model("User", userSchema);
