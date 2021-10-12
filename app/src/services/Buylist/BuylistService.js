const Buylistrepository = require("../../repository/Buylist/Buylistrepository");

class BuylistService {
  constructor(req) {
    this.params = req.params;
  }

  async findAllByUserNoAndProductNo() {
    const user = this.params;
    try {
      const buylist = await Buylistrepository.findAllByUserNoAndProductNo(user);

      return { buylist };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BuylistService;
