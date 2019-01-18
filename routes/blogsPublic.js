const Blog = require("../models/blog");
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
  return router;
};
