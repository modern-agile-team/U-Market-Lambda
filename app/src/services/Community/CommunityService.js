const CommunityRepository = require("../../repository/Community/CommunityRepository");

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
    const community = await CommunityRepository.findOneByNo(
      this.params.communityNo,
    );
    community.writer = {
      nickname: community.nickname,
      profileImage: community.profileImage,
    };

    delete community.nickname;
    delete community.profileImage;
    console.log(community);
    return { community };
  }
}

module.exports = CommunityService;
