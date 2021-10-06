const CommunityRepository = require("../../repository/Community/CommunityRepository");
const CommunityCommentRepository = require("../../repository/Community/CommunityCommentRepository");
const CommunityImageRepository = require("../../repository/Community/CommunityImageRepository");

class CommunityService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
    this.sql = req.sql;
  }

  async findAllAboutCategory() {
    const { startNo, categoryNo, limit } = this.query;
    const attr = {
      startNo: Number(startNo),
      limit: Number(limit),
      categoryNo: Number(categoryNo),
    };

    const categories = await CommunityRepository.findAllAboutCategoryBy(
      attr,
      this.sql,
    );
    return { categories };
  }

  async detailView() {
    // 커뮤니티 게시판의 상세 데이터 불러오기
    const community = await CommunityRepository.findOneByNo(
      this.params.communityNo,
    );
    community.writer = {
      nickname: community.nickname,
      profileImage: community.profileImage,
    };

    delete community.nickname;
    delete community.profileImage;

    // 커뮤니티 게시판의 이미지 데이터 모두 불러오기
    community.images = await CommunityImageRepository.findAllByCommunityNo(
      this.params.communityNo,
    );
    community.images = community.images.map(img => img.url);

    // 커뮤니티 게시판의 댓글 데이터 모두 불러오기
    community.comments = await CommunityCommentRepository.findAllByCommunityNo(
      this.params.communityNo,
    );
    community.comments = community.comments.map(cmt => {
      cmt.writer = {
        nickname: cmt.nickname,
        profileImage: cmt.profileImage,
      };

      delete cmt.nickname;
      delete cmt.profileImage;
      return cmt;
    });

    return { community };
  }
}

module.exports = CommunityService;
