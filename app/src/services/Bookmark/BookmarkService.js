const BookmarkRepository = require("../../repository/Bookmark/BookmarkRepository");

class BookmarkService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  async findAllByUserNo() {
    const userNo = this.params.userNo;
    try {
      const bookmarks = await BookmarkRepository.findAllByUserNo(userNo);

      if (bookmarks[0].no === null) return { bookmarks: [] };
      return { bookmarks };
    } catch (err) {
      throw err;
    }
  }

  async create() {
    const userNo = this.params.userNo;
    const communityNo = this.body.communityNo;
    try {
      await BookmarkRepository.create(userNo, communityNo);

      return { msg: "북마크에 저장 완료" };
    } catch (err) {
      if (err.errno === 1452) throw new Error("Already Exist Bookmark");
      throw err;
    }
  }

  async delete() {
    const userNo = this.params.userNo;
    const communityNo = this.body.communityNo;
    try {
      await BookmarkRepository.delete(userNo, communityNo);

      return { msg: "북마크 삭제 완료" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BookmarkService;
