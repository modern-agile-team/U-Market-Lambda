const ProductRepository = require("../../repository/Product/ProductRepository");
const WatchlistRepository = require("../../repository/Watchlist/WatchlistRepository");

class WatchlistService {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async findAllByUserNum() {
    const user = this.params;
    try {
      const watchlists = await WatchlistRepository.findAllByUserNum(user);
      return { watchlists };
    } catch (err) {
      throw err;
    }
  }

  async create() {
    const content = this.body;
    try {
      await WatchlistRepository.create(content);
      await ProductRepository.updateInterestByProductNo(content.productNo, "+");
      return { msg: "관심목록 등록 성공" };
    } catch (err) {
      if (err.errno === 1062) throw new Error("Already Exist Watchlist");
      throw err;
    }
  }

  async delete() {
    const content = this.body;
    try {
      const isExistData = await WatchlistRepository.delete(content);
      await ProductRepository.updateInterestByProductNo(content.productNo, "-");
      if (isExistData) return { msg: "관심목록 삭제 완료" };
      throw new Error("no data in the database");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = WatchlistService;
