const Logger = require("../../config/logger");

export const joiValidator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join("");

      Logger.debug(message);
      res.status(400).json({ error: message });
    }
  };
};
