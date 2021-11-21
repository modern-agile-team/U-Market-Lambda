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
      return products;
    } catch (err) {
      throw err;
    }
  }

  async findCommunityBySearch() {
    let word = this.query.query;
    try {
      word = word.replace(/\+/g, " ");
      const communities = await CommunityRepository.findAllBySearch(word);
      return communities;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SearchService;
