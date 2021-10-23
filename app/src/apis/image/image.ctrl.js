const { deleteImage } = require("../../middleware/image");
const logger = require("../../config/logger");

const process = {
  upload: async (req, res, next) => {
    const images = req.files;
    console.log(images);
    // const productNo = req.productNo;
    // console.log(productNo);
    try {
      const path = images.map(img => {
        let imagePath = img.location;
        let imageKey = imagePath.split("/")[imagePath.split("/").length - 1];
        let folder = imagePath.split("/")[imagePath.split("/").length - 2];
        imagePath = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}`;
        return imagePath;
      });
      //?w=200
      logger.info(`POST /api/image 200 업로드 성공`);
      return res.status(200).json({
        msg: "업로드 성공되었습니다.",
        images: path,
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res) => {
    const rest = req.body.url;
    if (rest.length) {
      const keys = [];
      rest.forEach(img => {
        const cutUrl = img.split("/");
        const length = cutUrl.length;
        const imageName = cutUrl[length - 1].split("?")[0];
        const key = `${cutUrl[length - 2]}/${imageName}`;
        keys.push(key);
      });
      const response = await deleteImage(keys);
      if (response) {
        logger.info(`DELETE /api/image 200 삭제 성공`);
        return res
          .status(200)
          .json({ success: true, msg: "삭제 완료되었습니다." });
      }
      logger.error(`DELETE /api/image 400 s3 접근 오류`);
      return res.status(400).json({ success: false, msg: "s3 접근 오류" });
    }
    logger.error(`DELETE /api/image 400 이미지가 없습니다.`);
    return res.status(400).json({ success: false, msg: "사진이 없습니다." });
  },
};

module.exports = process;
