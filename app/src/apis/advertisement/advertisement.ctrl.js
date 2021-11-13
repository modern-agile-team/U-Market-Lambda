const AdvertisementService = require("../../services/Advertisement/AdvertisementService");

const process = {
  saveInquiry: async (req, res, next) => {
    try {
      const advertisementService = new AdvertisementService(req);
      const response = await advertisementService.saveInquiry();

      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
