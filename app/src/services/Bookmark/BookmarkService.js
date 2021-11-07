const BookmarkRepository = require("../../repository/Bookmark/BookmarkRepository");

class BookmarkService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async findAllByUserNo() {
    const userNo = this.params.userNo;
    try {
      const bookmark = await BookmarkRepository.findAllByUserNo(userNo);

      if (bookmark[0].no === null) return { bookmark: [] };
      return { bookmark };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BookmarkService;
