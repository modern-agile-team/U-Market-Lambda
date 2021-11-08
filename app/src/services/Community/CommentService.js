const CommunityReplyRepository = require("../../repository/Community/Comment/CommunityReplyRepository");
const CommunityCommentRepository = require("../../repository/Community/Comment/CommunityCommentRepository");

class CommentService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
  }

  async createComment() {
    const content = this.body;
    try {
      await CommunityCommentRepository.create(content);

      return { msg: "댓글 생성 완료되었습니다." };
    } catch (err) {
      throw err;
    }
  }

  async createReply() {
    const content = this.body;
    try {
      await CommunityReplyRepository.create(content);

      return { msg: "답글 생성 완료되었습니다." };
    } catch (err) {
      throw err;
    }
  }

  async findReplyByCommentNo() {
    const commentNo = this.params.commentNo;
    const userNo = this.params.userNo;
    try {
      const replies = await CommunityReplyRepository.findAllByCommunityNo(
        userNo,
        commentNo,
      );

      return { replies: replies };
    } catch (err) {
      throw err;
    }
  }

  async updateCommentLikeCnt() {
    const commentNo = this.params.commentNo;
    const flag = this.body.flag;

    try {
      const registerUser = await CommunityCommentRepository.registerUserByNo(
        commentNo,
        this.body,
      );

      const response = await CommunityCommentRepository.updateLikeCnt(
        commentNo,
        flag,
      );

      if (response === "+" && registerUser === "+")
        return { msg: "좋아요 등록 완료" };

      return { msg: "좋아요 취소 완료" };
    } catch (err) {
      if (err.errno === 1690) throw new Error("LikeCount is not minus");
      if (err.errno === 1452) throw new Error("Not Exist Referenced Row");
      throw err;
    }
  }

  async updateReplyLikeCnt() {
    const replyNo = this.params.replyNo;
    const flag = this.body.flag;

    try {
      const registerUser = await CommunityReplyRepository.registerUserByNo(
        replyNo,
        this.body,
      );

      const response = await CommunityReplyRepository.updateLikeCnt(
        replyNo,
        flag,
      );

      if (response === "+" && registerUser === "+")
        return { msg: "좋아요 등록 완료" };

      return { msg: "좋아요 취소 완료" };
    } catch (err) {
      if (err.errno === 1690) throw new Error("LikeCount is not minus");
      if (err.errno === 1452) throw new Error("Not Exist Referenced Row");
      throw err;
    }
  }

  async updateComment() {
    const content = this.body;
    const commentNo = this.params.commentNo;

    try {
      await CommunityCommentRepository.updateComment(content, commentNo);

      return { msg: "댓글 수정 완료" };
    } catch (err) {
      throw err;
    }
  }

  async updateReply() {
    const content = this.body;
    const replyNo = this.params.replyNo;

    try {
      await CommunityReplyRepository.updateReply(content, replyNo);

      return { msg: "답글 수정 완료" };
    } catch (err) {
      throw err;
    }
  }

  async deleteReply() {
    const replyNo = this.params.replyNo;
    const commentNo = this.body.commentNo;
    try {
      await CommunityReplyRepository.deleteReply(replyNo);

      const isDeleteComment =
        await CommunityCommentRepository.findCountReplyByCommentNo(commentNo);

      if (!isDeleteComment[0].count) {
        await CommunityCommentRepository.delete(commentNo);
        return { msg: "답글과 댓글 삭제 완료" };
      }

      return { msg: "답글 삭제완료" };
    } catch (err) {
      throw err;
    }
  }

  async deleteComment() {
    const commentNo = this.params.commentNo;
    try {
      const reply = await CommunityReplyRepository.findReplyCountByCommentNo(
        commentNo,
      );

      if (reply[0].commentCount) {
        await CommunityCommentRepository.hiddenComment(commentNo);
        return { msg: "댓글 숨김 처리 완료", flag: 1 };
      }
      await CommunityCommentRepository.delete(commentNo);
      return { msg: "댓글 삭제 완료" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CommentService;
