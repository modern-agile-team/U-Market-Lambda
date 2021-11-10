const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_CONTROLL_KEY,
  secretAccessKey: process.env.S3_CONTROLL_SECRET_KEY,
  region: process.env.S3_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.S3_BUCKET}/board`,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
  limits: { fieldSize: 100 * 1024 * 1024 },
});

const profileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.S3_BUCKET}/profile`,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
  limits: { fieldSize: 100 * 1024 * 1024 },
});

const communityUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.S3_BUCKET}/community`,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
  limits: { fieldSize: 100 * 1024 * 1024 },
});

const deleteImage = async keys => {
  const objectKeys = [];
  for (const key of keys) {
    const rest = {
      Key: key,
    };
    objectKeys.push(rest);
  }

  const original = {
    Bucket: process.env.S3_BUCKET,
    Delete: {
      Objects: objectKeys,
      Quiet: false,
    },
  };

  try {
    const result = await s3
      .deleteObjects(original, err => {
        if (err) throw err;
      })
      .promise();

    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  deleteImage,
  upload,
  profileUpload,
  communityUpload,
};
// disk에 업로드할 때

// export const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req: express.Request, file, cb) {
//       cb(null, "/images");
//     },
//     filename: function (req: express.Request, file, cb) {
//       cb(null, Date.now() + "." + file.originalname.split(".").pop());
//     },
//   }),
// });
