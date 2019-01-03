const User = require("../models/user");

module.exports = router => {
  router.post("/register", (req, res) => {
    if (!req.body.login) {
      res.json({ success: false, message: "Podaj poprawny login" });
    } else if (!req.body.password) {
      res.json({ success: false, message: "Podaj poprawne hasło" });
    } else {
      let user = new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      });
      user.save(err => {
        if (err) {
          res.json({ success: false, message: "Error: ", err });
        }
      });
    }
  });
  return router;
};
