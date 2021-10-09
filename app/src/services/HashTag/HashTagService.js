const HashTagRepository = require("../../repository/HashTag/HashTagRepository");

class HashTagService {
  constructor(req = {}) {
    this.query = req.query;
    this.params = req.params;
    this.body = req.body;
  }

  async findAllOnlyNoByName(hashTagNames) {
    const hashTagNos = [];
    for (let hashTagName of hashTagNames) {
      let hashTagNo = await HashTagRepository.findOneByName(hashTagName);
      if (hashTagNo === undefined)
        hashTagNo = await HashTagRepository.insertOne(hashTagName);
      hashTagNos.push(hashTagNo);
    }
    return hashTagNos;
  }
}

module.exports = HashTagService;
