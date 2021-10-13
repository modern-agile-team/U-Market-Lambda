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

    const communities = await CommunityRepository.findAllAboutCategoryBy(
      attr,
      this.sql,
    );
    return { communities };
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

  async register() {
    // 이슈: images 저장 실패시 기존에 수행된 트랜잭션이 복구 되어야한다. -> 삽입된 데이터 다시 삭제되도록 구현해야함. 어떻게..?
    const { community } = this.body;
    try {
      const communityNo = await CommunityRepository.insertOne(community);
      community.images.forEach(async imageUrl => {
        await CommunityImageRepository.insertOne(communityNo, imageUrl);
      });

      return { communityNo };
    } catch (err) {
      if (err.errno === 1452) throw new Error("Not Exist Referenced Row");
      throw err;
    }
  }

  // async updateView() {
  //   const { communityNo } = this.params;
  //   const { community } = this.body;
  //   try {
  //     community.no = communityNo;
  //     community.tradingMethods.isDirect = Number(community.tradingMethods.isDirect);
  //     community.tradingMethods.isDelivery = Number(
  //       community.tradingMethods.isDelivery,
  //     );
  //     const isUpdateCommunity = await CommunityRepository.updateOneByNo(community);

  //     if (isUpdateCommunity) return { communityNo };
  //     throw new Error("Not Exist Community");
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async delete() {
  //   const { communityNo } = this.params;
  //   try {
  //     const isDeleteCommunity = await CommunityRepository.deleteOneByNo(communityNo);

  //     if (isDeleteCommunity) return true;
  //     throw new Error("Not Exist Community");
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}

module.exports = CommunityService;
