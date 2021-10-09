const WatchlistRepository = require("../../repository/Watchlist/WatchlistRepository");

class WatchlistService {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async findAllByUserNum() {
    const user = this.params;
    try {
      const result = await WatchlistRepository.findAllByUserNum(user);
      return { watchlist: result };
    } catch (err) {
      throw err;
    }
  }

  async create() {
    const content = this.body;
    try {
      const isExistData = await WatchlistRepository.isExistWatchlist(content);
      if (isExistData) {
        await WatchlistRepository.create(content);
        return { msg: "관심목록 등록 성공" };
      }
    } catch (err) {
      throw err;
    }
  }

  async delete() {
    const content = this.body;
    try {
      const isExistData = await WatchlistRepository.delete(content);
      if (isExistData) return { msg: "관심목록 삭제 완료" };
      throw new Error("no data in the database");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = WatchlistService;
