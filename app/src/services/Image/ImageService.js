const ImageRepository = require("../../repository/Image/ImageRepository");

class ImageService {
  constructor(req) {
    this.body = req.body;
  }

  async saveImage() {
    const user = this.body;
    const originalImageUrl = this.body.images;

    try {
      if (originalImageUrl === undefined || originalImageUrl.length === 0)
        throw new Error("Not Exist ImageUrl");

      const path = await originalImageUrl.map(img => {
        let imageKey = img.split("/")[img.split("/").length - 1];
        let folder = img.split("/")[img.split("/").length - 2];
        img = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}`;
        return img;
      });

      const result = await ImageRepository.uploadImage(user, path);
      if (result) return { msg: "DB에 사진 정상 저장", imageUrl: path };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ImageService;
