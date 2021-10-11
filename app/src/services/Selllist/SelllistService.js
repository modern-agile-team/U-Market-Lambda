const SelllistRepository = require("../../repository/Selllist/SelllistRepository");

class SelllistService {
  constructor(req) {
    this.params = req.params;
  }

  async findAllByUserNo() {
    const user = this.params;
    const statusNo = 1;
    try {
      const selllist = await SelllistRepository.findAllByUserNo(user, statusNo);

      return { selllist };
    } catch (err) {
      throw err;
    }
  }

  async findEndingTradeByUserNo() {
    const user = this.params;
    const statusNo = 2;
    try {
      const endSelllist = await SelllistRepository.findAllByUserNoForStatus(
        user,
        statusNo,
      );

      return { endSelllist };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SelllistService;
