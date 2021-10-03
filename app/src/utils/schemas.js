const Joi = require("joi");

export const signup_POST_schema = Joi.object().keys({
  email: Joi.string()
    .required()
    .regex(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    )
    .messages({
      "string.base": "email 은 문자 형식입니다.",
      "string.empty": "email 값을 입력해주세요.",
      "string.pattern.base": "email 형식이 틀렸습니다.",
      "any.required": "email 필드가 비었습니다.",
    }),
  nickname: Joi.string().required().min(2).max(30).messages({
    "string.base": "nickname 은 문자 형식입니다.",
    "string.empty": "nickname 값을 입력해주세요.",
    "string.min": "nickanme 은 최소 2글자 이상입니다.",
    "string.max": "nickanme 은 최대 30글자입니다.",
    "any.required": "nickname 필드가 비었습니다.",
  }),
  name: Joi.string().required().min(2).max(20).messages({
    "string.base": "name 은 문자 형식입니다.",
    "string.empty": "name 값을 입력해주세요.",
    "string.min": "name 은 최소 2글자 입니다.",
    "string.max": "name 은 최대 20글자입니다.",
    "any.required": "name 필드가 비었습니다.",
  }),
});

export const user_DELETE_schema = Joi.object().keys({
  id: Joi.number().integer().required().messages({
    "number.base": "id는 숫자 형식입니다.",
    "number.integer": "id는 정수입니다.",
  }),
});

export const major_POST_schema = Joi.object().keys({
  department: Joi.string().required().min(2).max(30).messages({
    "string.base": "department 은 문자 형식입니다.",
    "string.empty": "department 값을 입력해주세요.",
    "string.min": "department 은 최소 2글자 입니다.",
    "string.max": "department 은 최대 30글자입니다.",
    "any.required": "department 필드가 비었습니다.",
  }),
  major: Joi.string().required().min(2).max(30).messages({
    "string.base": "major 은 문자 형식입니다.",
    "string.empty": "major 값을 입력해주세요.",
    "string.min": "major 은 최소 2글자 입니다.",
    "string.max": "major 은 최대 30글자입니다.",
    "any.required": "major 필드가 비었습니다.",
  }),
});

// export const market_POST_schema = Joi.object().keys({
//   name: Joi.string().required().max(20).messages({
//     "string.base": "name 은 문자 형식입니다.",
//     "string.empty": "name 값을 입력해주세요.",
//     "string.max": "name 은 최대 20글자입니다.",
//     "any.required": "name 필드가 비었습니다.",
//   }),
//   categoryNum: Joi.number().integer().required().messages({
//     "number.base": "categoryNum 숫자 형식입니다.",
//     "number.integer": "categoryNum 정수입니다.",
//     "any.required": "categoryNum 필드가 비었습니다.",
//   }),
//   price: Joi.string().required().max(9).messages({
//     "string.base": "price 은 문자 형식입니다.",
//     "string.empty": "price 값을 입력해주세요.",
//     "string.max": "price 최대 금액은 999,999,999입니다.",
//     "any.required": "price 필드가 비었습니다.",
//   }),
//   information: Joi.string().required().messages({
//     "string.base": "information 은 문자 형식입니다.",
//     "string.empty": "information 값을 입력해주세요.",
//     "any.required": "information 필드가 비었습니다.",
//   }),
// });
