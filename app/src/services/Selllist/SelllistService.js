const SelllistRepository = require("../../repository/Selllist/SelllistRepository");

class SelllistService {
  constructor(req) {
    this.params = req.params;
  }

  async findAllByUserNo() {
    const user = this.params;
    try {
      const selllist = await SelllistRepository.findAllByUserNo(user);

      return { selllist: selllist };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SelllistService;
