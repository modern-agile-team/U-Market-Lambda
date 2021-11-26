const CommunityRepository = require("../../repository/Community/CommunityRepository");
const ProductRepository = require("../../repository/Product/ProductRepository");

class SearchService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
  }

  async findProductBySearch() {
    let word = this.query.query;
    try {
      word = word.replace(/\+/g, " ");
      const products = await ProductRepository.findAllBySearch(word);
      return { products };
    } catch (err) {
      throw err;
    }
  }

  async findCommunityBySearch() {
    let word = this.query.query;
    let free = [];
    let forAlone = [];
    let promotion = [];
    let question = [];
    const communities = {};
    try {
      word = word.replace(/\+/g, " ");
      const searchResult = await CommunityRepository.findAllBySearch(word);

      searchResult.map(community => {
        if (community.categoryNo === 1) {
          free = [...free, community];
        }
        if (community.categoryNo === 2) {
          forAlone = [...forAlone, community];
        }
        if (community.categoryNo === 3) {
          promotion = [...promotion, community];
        }
        if (community.categoryNo === 4) {
          question = [...question, community];
        }
      });

      communities.free = free;
      communities.forAlone = forAlone;
      communities.promotion = promotion;
      communities.question = question;
      communities.freeCount = free.length;
      communities.forAloneCount = forAlone.length;
      communities.promotionCount = promotion.length;
      communities.questionCount = question.length;

      return { communities };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SearchService;
