const User = require("../models/user"); // Import User Model Schema
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

module.exports = router => {
  router.post("/newBlog", (req, res) => {
    if (!req.body.title) {
      res.json({ success: false, message: "You must provide a title" }); // Return error
    } else {
      // Check if name was provided
      if (!req.body.blog) {
        res.json({ success: false, message: "You must provide a content" }); // Return error
      } else {
        let blog = new Blog({
          title: req.body.title,
          blog: req.body.blog
        });
        // Save user to database
        blog.save(err => {
          // Check if error occured
          if (err) {
            if (err.errors) {
              // Check if validation error is in the title field
              if (err.errors.title) {
                res.json({ success: false, message: err.errors.title.message }); // Return error message
              } else {
                // Check if validation error is in the body field
                if (err.errors.blog) {
                  res.json({
                    success: false,
                    message: err.errors.blog.message
                  }); // Return error message
                } else {
                  res.json({ success: false, message: err }); // Return general error message
                }
              }
            } else {
              res.json({ success: false, message: err }); // Return general error message
            }
          } else {
            res.json({ success: true, message: "Blog post registered!" }); // Return success
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
  return router;
};
