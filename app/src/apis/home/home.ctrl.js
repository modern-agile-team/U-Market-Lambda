const ProductStorage = require("../../models/services/Product/ProductStorage");

const process = {
  home: async (req, res) => {
    try {
      const hotProducts = await ProductStorage.findHotsByLimit(10);
      const newProducts = await ProductStorage.findNewsByLimit(12);

      const response = {
        success: true,
        msg: "홈 화면 물품 데이터 조회에 성공하셨습니다.",
        hotProducts,
        newProducts,
      };
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = process;
