const User = require("../../models/services/User/User");

const process = {
  signup: async (req, res) => {
    try {
      const user = new User(req);
      const response = await user.signup();
      if (response.success) return res.status(201).json(response);
      return res.status(401).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = process;
