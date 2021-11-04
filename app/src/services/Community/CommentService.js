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

  async updateCommentLikeCnt() {
    const commentNo = this.params.commentNo;
    const flag = this.body.flag;

    try {
      const response = await CommunityCommentRepository.updateLikeCnt(
        commentNo,
        flag,
      );

      if (response === "+") return { msg: "좋아요 등록 완료" };

      return { msg: "좋아요 취소 완료" };
    } catch (err) {
      throw err;
    }
  }

  async updateReplyCommentLikeCnt() {
    const replyCommentNo = this.params.replyCommentNo;
    const flag = this.body.flag;

    try {
      const response = await CommunityReplyCommentRepository.updateLikeCnt(
        replyCommentNo,
        flag,
      );

      if (response === "+") return { msg: "좋아요 등록 완료" };

      return { msg: "좋아요 취소 완료" };
    } catch (err) {
      throw err;
    }
  }

  async updateComment() {
    const content = this.body;

    try {
      await CommunityCommentRepository.updateComment(content);

      return { msg: "댓글 수정 완료" };
    } catch (err) {
      throw err;
    }
  }

  async updateReplyComment() {
    const content = this.body;

    try {
      await CommunityReplyCommentRepository.updateReplyComment(content);

      return { msg: "답글 수정 완료" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CommentService;
