const User = require("../models/user"); // Import User Model Schema
const jwt = require("jsonwebtoken");
const config = require("../config/database");

module.exports = router => {
  /* ==============
     Register Route
  ============== */
  router.post("/register", (req, res) => {
    // Check if login was provided
    if (!req.body.login) {
      res.json({ success: false, message: "You must provide an e-mail" }); // Return error
    } else {
      // Check if name was provided
      if (!req.body.name) {
        res.json({ success: false, message: "You must provide a name" }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.password) {
          res.json({ success: false, message: "You must provide a password" }); // Return error
        } else {
          // Create new user object and apply user input
          let user = new User({
            login: req.body.login.toLowerCase(),
            name: req.body.name.toLowerCase(),
            password: req.body.password
          });
          // Save user to database
          user.save(err => {
            // Check if error occured
            if (err) {
              // Check if error is an error indicating duplicate account
              if (err.code === 11000) {
                res.json({
                  success: false,
                  message: "name or e-mail already exists"
                }); // Return error
              } else {
                // Check if error is a validation rror
                if (err.errors) {
                  // Check if validation error is in the login field
                  if (err.errors.login) {
                    res.json({
                      success: false,
                      message: err.errors.login.message
                    }); // Return error
                  } else {
                    // Check if validation error is in the name field
                    if (err.errors.name) {
                      res.json({
                        success: false,
                        message: err.errors.name.message
                      }); // Return error
                    } else {
                      // Check if validation error is in the password field
                      if (err.errors.password) {
                        res.json({
                          success: false,
                          message: err.errors.password.message
                        }); // Return error
                      } else {
                        res.json({ success: false, message: err }); // Return any other error not already covered
                      }
                    }
                  }
                } else {
                  res.json({
                    success: false,
                    message: "Could not save user. Error: ",
                    err
                  }); // Return error if not related to validation
                }
              }
            } else {
              res.json({ success: true, message: "Acount registered!" }); // Return success
            }
          });
        }
      }
    }
  });
  router.post("/login", (req, res) => {
    if (!req.body.login) {
      res.json({ success: false, message: "No login provided" });
    } else {
      if (!req.body.password) {
        res.json({ success: false, message: "No password provided" });
      } else {
        User.findOne({ login: req.body.login.toLowerCase() }, (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            if (!user) {
              res.json({ success: false, message: "No user found" });
            } else {
              const validPassword = user.comparePassword(req.body.password);
              if (!validPassword) {
                res.json({ success: false, message: "Password invalid" });
              } else {
                const token = jwt.sign({ userId: user._id }, config.secret, {
                  expiresIn: "24h"
                });
                res.json({
                  success: true,
                  message: "Success",
                  token: token,
                  user: { login: user.login }
                });
              }
            }
          }
        });
      }
    }
  });
  router.use((req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      res.json({ success: false, message: "No token provided" });
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: "Token invalid" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  });
  router.get("/profile", (req, res) => {
    User.findOne({ _id: req.decoded.userId })
      .select("login name")
      .exec((err, user) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (!user) {
            res.json({ success: false, message: "No user found" });
          } else {
            res.json({ success: true, user: user });
          }
        }
      });
  });
  return router; // Return router object to main index.js
};
