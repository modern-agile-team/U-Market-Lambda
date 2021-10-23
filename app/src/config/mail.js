module.exports = {
  service: process.env.MAIL_SERVICE || "",
  host: process.env.MAIL_HOST || "",
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_EMAIL || "",
    pass: process.env.MAIL_PASSWORD || "",
  },
};
