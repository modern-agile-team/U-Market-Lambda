const CommunityRepository = require("../../repository/Community/CommunityRepository");
const ProductRepository = require("../../repository/Product/ProductRepository");

class SearchService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
  }

  async findProductBySearch() {
    const word = this.query.query;
    try {
      console.log(word);
      const products = await ProductRepository.findAllBySearch(word);
      return products;
    } catch (err) {
      throw err;
    }
  }

  async findCommunityBySearch() {
    const word = this.query.query;
    try {
      const communities = await CommunityRepository.findAllBySearch(word);

      return communities;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SearchService;
