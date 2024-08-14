const User = require("../models/user");

module.exports.signup = async (req, res) => {
  const { email, password, username } = req.body;
  let user = new User({ username, email });
  let newUser = await User.register(user, password);
  req.login(newUser, (e) => {
    if (e) console.log(e);
  });
  res.json(newUser);
};

module.exports.login = (req, res) => {
  res.json(req.body);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return err;
    }
    req.session.destroy((err) => {
      if (err) {
        return err;
      }
      res.status(200).json({ message: "Logout successful" });
    });
  });
};
