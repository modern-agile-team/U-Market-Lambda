const Joi = require("joi");

const signup_POST_schema = Joi.object().keys({
  regionNum: Joi.number().required().messages({
    "number.base": "regionNum 은 숫자 형식입니다.",
    "number.integer": "regionNum 은 정수입니다.",
    "any.required": "regionNum 필드가 비었습니다",
  }),

  schoolNum: Joi.number().required().messages({
    "number.base": "schoolNum 은 숫자 형식입니다.",
    "number.integer": "schoolNum 은 정수입니다.",
    "any.required": "schoolNum 필드가 비었습니다",
  }),

  majorNum: Joi.number().required().messages({
    "number.base": "majorNum 은 숫자 형식입니다.",
    "number.integer": "majorNum 은 정수입니다.",
    "any.required": "majorNum 필드가 비었습니다",
  }),

  grade: Joi.number().required().messages({
    "number.base": "grade 은 숫자 형식입니다.",
    "number.integer": "grade 은 정수입니다.",
    "any.required": "grade 필드가 비었습니다",
  }),

  email: Joi.string().required().email().messages({
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
  psword: Joi.string().required().messages({
    "string.base": "psword 은 문자 형식입니다.",
    "string.empty": "psword 값을 입력해주세요.",
    "any.required": "psword 필드가 비었습니다.",
  }),
});

const login_POST_schema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    "string.base": "email 은 문자 형식입니다.",
    "string.empty": "email 값을 입력해주세요.",
    "string.pattern.base": "email 형식이 틀렸습니다.",
    "any.required": "email 필드가 비었습니다.",
  }),
  psword: Joi.string().required().messages({
    "string.base": "psword 은 문자 형식입니다.",
    "string.empty": "psword 값을 입력해주세요.",
    "any.required": "psword 필드가 비었습니다.",
  }),
});

const user_DELETE_schema = Joi.object().keys({
  id: Joi.number().integer().required().messages({
    "number.base": "id는 숫자 형식입니다.",
    "number.integer": "id는 정수입니다.",
  }),
});

const major_POST_schema = Joi.object().keys({
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

const home = {
  byPrice_GET_schema: Joi.object().keys({
    sort: Joi.string().required().valid("desc", "asc").messages({
      "string.base": "sort 은 문자 형식입니다.",
      "string.empty": "sort 값을 입력해주세요.",
      "any.invalid":
        "잘못된 요청입니다. {sort} 파라미터는 'asc' 혹은 'desc' 둘 중 하나만 가능합니다.",
      "any.required": "sort 필드가 비었습니다.",
    }),
    startNo: Joi.number().required().messages({
      "number.base": "startNo는 숫자 형식입니다.",
      "number.integer": "startNo는 정수입니다.",
      "any.required": "startNo 필드가 비었습니다.",
    }),
    limit: Joi.number().required().messages({
      "number.base": "limit은 숫자 형식입니다.",
      "number.integer": "limit은 정수입니다.",
      "any.required": "limit 필드가 비었습니다.",
    }),
  }),
  viewedProducts: {
    query_GET_schema: Joi.object().keys({
      startNo: Joi.number().required().messages({
        "number.base": "startNo는 숫자 형식입니다.",
        "number.integer": "startNo는 정수입니다.",
        "any.required": "startNo 필드가 비었습니다.",
      }),
      limit: Joi.number().required().messages({
        "number.base": "limit은 숫자 형식입니다.",
        "number.integer": "limit은 정수입니다.",
        "any.required": "limit 필드가 비었습니다.",
      }),
    }),
    params_GET_schema: Joi.object().keys({
      userNo: Joi.number().required().messages({
        "number.base": "userNo은 숫자 형식입니다.",
        "number.integer": "userNo은 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
    }),
  },
};

const products = {
  root_GET_schema: Joi.object().keys({
    startNo: Joi.number().required().messages({
      "number.base": "startNo는 숫자 형식입니다.",
      "number.integer": "startNo는 정수입니다.",
      "any.required": "startNo 필드가 비었습니다.",
    }),
    limit: Joi.number().required().messages({
      "number.base": "limit은 숫자 형식입니다.",
      "number.integer": "limit은 정수입니다.",
      "any.required": "limit 필드가 비었습니다.",
    }),
    regionNo: Joi.number().messages({
      "number.base": "regionNo은 숫자 형식입니다.",
      "number.integer": "regionNo은 정수입니다.",
    }),
    schoolNo: Joi.number().messages({
      "number.base": "schoolNo은 숫자 형식입니다.",
      "number.integer": "schoolNo은 정수입니다.",
    }),
    departmentNo: Joi.number().messages({
      "number.base": "departmentNo은 숫자 형식입니다.",
      "number.integer": "departmentNo은 정수입니다.",
    }),
    majorNo: Joi.number().messages({
      "number.base": "majorNo은 숫자 형식입니다.",
      "number.integer": "majorNo은 정수입니다.",
    }),
  }),
};

const communities = {
  root_GET_schema: Joi.object().keys({
    startNo: Joi.number().required().messages({
      "number.base": "startNo는 숫자 형식입니다.",
      "number.integer": "startNo는 정수입니다.",
      "any.required": "startNo 필드가 비었습니다.",
    }),
    limit: Joi.number().required().messages({
      "number.base": "limit은 숫자 형식입니다.",
      "number.integer": "limit은 정수입니다.",
      "any.required": "limit 필드가 비었습니다.",
    }),
    categoryNo: Joi.number().required().messages({
      "number.base": "categoryNo은 숫자 형식입니다.",
      "number.integer": "categoryNo은 정수입니다.",
      "any.required": "categoryNo 필드가 비었습니다.",
    }),
  }),
  communityNo_GET_schema: Joi.object().keys({
    communityNo: Joi.number().required().messages({
      "number.base": "communityNo은 숫자 형식입니다.",
      "number.integer": "communityNo은 정수입니다.",
      "any.required": "communityNo 필드가 비었습니다.",
    }),
  }),
};

const watchlist = {
  watchlist_POST_DELETE_schema: Joi.object().keys({
    userNo: Joi.number().required().messages({
      "number.base": "userNo 는 숫자 형식입니다.",
      "number.integer": "userNo 는 정수입니다.",
      "any.required": "userNo 필드가 비었습니다.",
    }),
    productNo: Joi.number().required().messages({
      "number.base": "productNo 는 숫자 형식입니다.",
      "number.integer": "productNo 는 정수입니다.",
      "any.required": "productNo 필드가 비었습니다.",
    }),
  }),
};

module.exports = {
  major_POST_schema,
  user_DELETE_schema,
  login_POST_schema,
  signup_POST_schema,
  home,
  products,
  communities,
  watchlist,
};

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
