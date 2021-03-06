const User = require("../models/user"); // Import User Model Schema
const Blog = require("../models/blog");
const Category = require("../models/category");
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
          excerpt: req.body.excerpt,
          slug: req.body.slug,
          blog: req.body.blog,
          category: req.body.category
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
                  if (err.errors.category) {
                    res.json({
                      success: false,
                      message: err.errors.category.message
                    });
                  } else {
                    res.json({ success: false, message: err });
                  } // Return general error message
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
  router.get("/categories", (req, res) => {
    Category.find({}, (err, cats) => {
      if (err) {
        console.log(err);
        res.json({ sucess: false, message: err });
      } else {
        if (!cats) {
          res.json({ sucess: false, message: "No blogs found" });
        } else {
          res.json({ success: true, cats: cats });
        }
      }
    });
  });
  router.get("/post/:id", (req, res) => {
    Blog.findOne(
      {
        _id: req.params.id
      },
      (err, blogs) => {
        if (err) {
          res.json({ sucess: false, message: err });
        } else {
          if (!blogs) {
            res.json({ sucess: false, message: "No blogs found" });
          } else {
            res.json({ success: true, blogs: blogs });
          }
        }
      }
    );
  });
  router.put("/editPost", (req, res) => {
    if (!req.body._id) {
      res.json({ success: false, message: "Coś poszło nie tak" });
    } else {
      Blog.findOne({ _id: req.body._id }, (err, blog) => {
        if (err || !blog) {
          res.json({
            success: false,
            message: "Nie znaleziono w bazie takiego id"
          });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: "Błąd łączenia z userem" });
            } else {
              blog.title = req.body.title;
              blog.blog = req.body.blog;
              blog.excerpt = req.body.excerpt;
              blog.category = req.body.category;
              blog.save(err => {
                if (err) {
                  res.json({
                    success: false,
                    message: "Nie udało się zapisać"
                  });
                } else {
                  res.json({ success: true, message: "Blog updated" });
                }
              });
            }
          });
        }
      });
    }
  });
  router.delete("/deletePost/:id", (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: "Nie podano id" });
    } else {
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err || !blog) {
          res.json({ success: false, message: "Nie znaleziono id" });
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err || !user) {
              res.json({
                success: false,
                message: "Nie znaleziono id"
              });
            } else {
              blog.remove(err => {
                if (err) {
                  res.json({
                    success: false,
                    message: "Nie udało sie usunąć"
                  });
                } else {
                  res.json({
                    success: true,
                    message: "Usunięto post"
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  return router;
};
