const Major = require("../../models/services/Major/Major");

const process = {
  findSchoolNumAndName: async (req, res) => {
    try {
      const user = new Major(req);
      const response = await user.findSchoolNumAndName();
      if (response.success) return res.status(201).json(response.result);
      return res.status(401).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  findDepartmentNumAndName: async (req, res) => {
    try {
      const user = new Major(req);
      const response = await user.findDepartmentNumAndName();
      if (response.success) return res.status(201).json(response.result);
      return res.status(401).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  createMajorByname: async (req, res) => {
    try {
      const user = new Major(req);
      const response = await user.createMajorByname();
      if (response.success) return res.status(201).json(response);
      return res.status(401).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = process;
