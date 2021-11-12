const { deleteImage } = require("../../middleware/image");
const logger = require("../../config/logger");
const ImageService = require("../../services/Image/ImageService");

const process = {
  upload: async (req, res, next) => {
    const images = req.files;
    try {
      const path = images.map(img => {
        let imagePath = img.location;
        return imagePath;
      });
      logger.info(`POST /api/image 200 업로드 성공`);
      return res.status(200).json({
        msg: "업로드 성공되었습니다.",
        images: path,
      });
    } catch (err) {
      next(err);
    }
  },

  profileUpload: async (req, res, next) => {
    const image = req.file;
    try {
      const path = image.location;
      logger.info(`POST /api/image/profile 200 업로드 성공`);
      return res.status(200).json({
        msg: "업로드 성공되었습니다.",
        images: path,
      });
    } catch (err) {
      next(err);
    }
  },

  communityUpload: async (req, res, next) => {
    const images = req.files;
    try {
      const path = images.map(img => {
        let imagePath = img.location;
        return imagePath;
      });
      logger.info(`POST /api/image/community 200 업로드 성공`);
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
        return res.status(204).end();
      }
      logger.error(`DELETE /api/image 400 s3 접근 오류`);
      return res.status(400).json({ success: false, msg: "s3 접근 오류" });
    }
    logger.error(`DELETE /api/image 400 이미지가 없습니다.`);
    return res.status(400).json({ success: false, msg: "사진이 없습니다." });
  },

  saveImage: async (req, res, next) => {
    try {
      const imageService = new ImageService(req);
      const response = await imageService.saveImage();
      if (response) {
        logger.info(`POST /api/image/save 200 DB 저장 성공`);
        return res.status(200).json(response);
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = process;
