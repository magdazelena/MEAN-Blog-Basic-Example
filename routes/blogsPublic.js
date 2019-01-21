const Blog = require("../models/blog");
const Category = require("../models/category");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

module.exports = router => {
  router.get("/allBlogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
      if (err) {
        res.json({ sucess: false, message: err });
      } else {
        if (!blogs) {
          res.json({ sucess: false, message: "No blogs found" });
        } else {
          res.json({ success: true, blogs: blogs });
        }
      }
    }).sort({ _id: -1 });
  });
  router.get("/getPost/:arg", (req, res) => {
    Blog.findOne({ slug: req.params.arg }, (err, blogs) => {
      if (err) {
        res.json({ sucess: false, message: err });
      } else {
        if (!blogs) {
          res.json({ sucess: false, message: "No blogs found" });
        } else {
          res.json({ success: true, blogs: blogs });
        }
      }
    });
  });

  router.get("/categories", (req, res) => {
    Category.find({}, (err, cats) => {
      if (err) {
        console.log(err);
        res.json({ sucess: false, message: err });
      } else {
        if (!cats) {
          res.json({ sucess: false, message: "cats found" });
        } else {
          res.json({ success: true, cats: cats });
        }
      }
    });
  });
  router.get("/cat/:arg", (req, res) => {
    Blog.find({ category: req.params.arg }, (err, blogs) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!blogs || blogs.length == 0) {
          res.json({ success: false, message: "Ups, nothing found here!" });
        } else {
          res.json({ success: true, blogs: blogs });
        }
      }
    });
  });
  return router;
};
