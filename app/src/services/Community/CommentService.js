const CommunityReplyCommentRepository = require("../../repository/Community/Comment/CommunityReplyCommentRepository");
const CommunityCommentRepository = require("../../repository/Community/Comment/CommunityCommentRepository");

class CommentService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
  }

  async createComment() {
    const content = this.body;
    const communityNo = this.params.communityNo;
    try {
      await CommunityCommentRepository.create(content, communityNo);

      return { msg: "댓글 생성 완료되었습니다." };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CommentService;
