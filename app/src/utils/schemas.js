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
  departmentNum: Joi.number().required().messages({
    "number.base": "departmentNum 은 숫자 형식입니다.",
    "number.integer": "departmentNum 은 정수입니다.",
    "any.required": "departmentNum 필드가 비었습니다",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "email 은 문자 형식입니다.",
    "string.empty": "email 값을 입력해주세요.",
    "string.pattern.base": "email 형식이 틀렸습니다.",
    "any.required": "email 필드가 비었습니다.",
  }),
  name: Joi.string().required().messages({
    "string.base": "name 은 문자 형식입니다.",
    "string.empty": "name 값을 입력해주세요.",
    "any.required": "name 필드가 비었습니다.",
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

const user = {
  params: Joi.object().keys({
    userNo: Joi.number().integer().required().messages({
      "number.base": "userNo 는 숫자 형식입니다.",
      "number.integer": "userNo 는 정수입니다.",
      "any.required": "userNo 필드가 비었습니다.",
    }),
  }),
  body: Joi.object().keys({
    nickname: Joi.string().required().messages({
      "string.base": "nickname 은 문자 형식입니다.",
      "string.empty": "nickname 값을 입력해주세요.",
      "any.required": "nickname 필드가 비었습니다.",
    }),
  }),

  review: {
    create: {
      body: Joi.object().keys({
        productNo: Joi.number().integer().required().messages({
          "number.base": "productNo 는 숫자 형식입니다.",
          "number.integer": "productNo 는 정수입니다.",
          "any.required": "productNo 필드가 비었습니다.",
        }),
        sellerNo: Joi.number().integer().required().messages({
          "number.base": "sellerNo 는 숫자 형식입니다.",
          "number.integer": "sellerNo 는 정수입니다.",
          "any.required": "sellerNo 필드가 비었습니다.",
        }),
        buyerNo: Joi.number().integer().required().messages({
          "number.base": "buyerNo 는 숫자 형식입니다.",
          "number.integer": "buyerNo 는 정수입니다.",
          "any.required": "buyerNo 필드가 비었습니다.",
        }),
        description: Joi.string().required().messages({
          "string.base": "description 은 문자 형식입니다.",
          "string.empty": "description 값을 입력해주세요.",
          "any.required": "description 필드가 비었습니다.",
        }),
        trustScore: Joi.number().required().messages({
          "number.base": "trustScore 는 숫자 형식입니다.",
          "any.required": "trustScore 필드가 비었습니다.",
        }),
        writer: Joi.number().min(0).max(1).required().messages({
          "number.base": "writer 는 숫자 형식입니다.",
          "number.integer": "writer 는 정수입니다.",
          "number.min": "writer 는 0 이상 입니다.",
          "number.max": "writer 는 1 이하입니다.",
          "any.required": "writer 필드가 비었습니다.",
        }),
      }),
    },
    createBuyer: {
      body: Joi.object().keys({
        productNo: Joi.number().required().messages({
          "number.base": "productNo 는 숫자 형식입니다.",
          "number.integer": "productNo 는 정수입니다.",
          "any.required": "productNo 필드가 비었습니다.",
        }),
      }),
      params: Joi.object().keys({
        userNo: Joi.number().required().messages({
          "number.base": "userNo 는 숫자 형식입니다.",
          "number.integer": "userNo 는 정수입니다.",
          "any.required": "userNo 필드가 비었습니다.",
        }),
      }),
    },
    body: Joi.object().keys({
      buyerNo: Joi.number().integer().required().messages({
        "number.base": "buyerNo 는 숫자 형식입니다.",
        "number.integer": "buyerNo 는 정수입니다.",
        "any.required": "buyerNo 필드가 비었습니다.",
      }),
      productNo: Joi.number().integer().required().messages({
        "number.base": "productNo 는 숫자 형식입니다.",
        "number.integer": "productNo 는 정수입니다.",
        "any.required": "productNo 필드가 비었습니다.",
      }),
      sellerNo: Joi.number().integer().required().messages({
        "number.base": "sellerNo 는 숫자 형식입니다.",
        "number.integer": "sellerNo 는 정수입니다.",
        "any.required": "sellerNo 필드가 비었습니다.",
      }),
    }),

    updateScore: {
      body: Joi.object().keys({
        trustScore: Joi.number().required().messages({
          "number.base": "trustScore 는 숫자 형식입니다.",
          "any.required": "trustScore 필드가 비었습니다.",
        }),
      }),
      params: Joi.object().keys({
        userNo: Joi.number().required().messages({
          "number.base": "userNo 는 숫자 형식입니다.",
          "number.integer": "userNo 는 정수입니다.",
          "any.required": "userNo 필드가 비었습니다.",
        }),
      }),
    },
    find: {
      params: Joi.object().keys({
        userNo: Joi.number().required().messages({
          "number.base": "userNo 는 숫자 형식입니다.",
          "number.integer": "userNo 는 정수입니다.",
          "any.required": "userNo 필드가 비었습니다.",
        }),
      }),

      query: Joi.object().keys({
        product: Joi.number().required().messages({
          "number.base": "product 는 숫자 형식입니다.",
          "number.integer": "product 는 정수입니다.",
          "any.required": "product 필드가 비었습니다.",
        }),
      }),
    },
  },
};

const major = Joi.object().keys({
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
  byPrice: Joi.object().keys({
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
    query: Joi.object().keys({
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
    params: Joi.object().keys({
      userNo: Joi.number().required().messages({
        "number.base": "userNo은 숫자 형식입니다.",
        "number.integer": "userNo은 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
    }),
  },
};

const products = {
  query: {
    root: Joi.object().keys({
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
      startPriceRange: Joi.number().messages({
        "number.base": "startPriceRange은 숫자 형식입니다.",
        "number.integer": "startPriceRange은 정수입니다.",
      }),
      endPriceRange: Joi.number().messages({
        "number.base": "endPriceRange은 숫자 형식입니다.",
        "number.integer": "endPriceRange은 정수입니다.",
      }),
    }),
    category: Joi.object().keys({
      detail: Joi.string().required().messages({
        "string.base": "detail 은 문자 형식입니다.",
        "string.empty": "detail 값을 입력해주세요.",
        "any.required": "detail 필드가 비었습니다.",
      }),
    }),
  },
  params: {
    category: Joi.object().keys({
      categoryNo: Joi.number().required().messages({
        "number.base": "category 은 문자 형식입니다.",
        "number.integer": "category 값을 입력해주세요.",
        "any.required": "category 필드가 비었습니다.",
      }),
    }),

    productNo: Joi.object().keys({
      productNo: Joi.number().required().messages({
        "number.base": "productNo은 숫자 형식입니다.",
        "number.integer": "productNo은 정수입니다.",
        "any.required": "productNo 필드가 비었습니다.",
      }),
    }),
    detail: Joi.object().keys({
      productNo: Joi.number().required().messages({
        "number.base": "productNo은 숫자 형식입니다.",
        "number.integer": "productNo은 정수입니다.",
        "any.required": "productNo 필드가 비었습니다.",
      }),
      userNo: Joi.number().required().messages({
        "number.base": "userNo 은 숫자 형식입니다.",
        "number.integer": "userNo 은 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
    }),
  },
  body: {
    status: Joi.object().keys({
      status: Joi.number().required().messages({
        "number.base": "status 은 숫자 형식입니다.",
        "number.integer": "status 은 정수입니다.",
        "any.required": "status 필드가 비었습니다.",
      }),
    }),
    root: Joi.object().keys({
      product: Joi.object()
        .required()
        .messages({
          "object.base": "product는 Object 형식입니다.",
          "any.required": "product 필드가 비었습니다.",
        })
        .keys({
          userNo: Joi.number().required().messages({
            "number.base": "userNo은 숫자 형식입니다.",
            "number.integer": "userNo은 정수입니다.",
            "any.required": "userNo 필드가 비었습니다.",
          }),
          regionNo: Joi.number().required().messages({
            "number.base": "regionNo은 숫자 형식입니다.",
            "number.integer": "regionNo은 정수입니다.",
            "any.required": "regionNo 필드가 비었습니다.",
          }),
          schoolNo: Joi.number().required().messages({
            "number.base": "schoolNo은 숫자 형식입니다.",
            "number.integer": "schoolNo은 정수입니다.",
            "any.required": "schoolNo 필드가 비었습니다.",
          }),
          departmentNo: Joi.number().required().messages({
            "number.base": "departmentNo은 숫자 형식입니다.",
            "number.integer": "departmentNo은 정수입니다.",
            "any.required": "departmentNo 필드가 비었습니다.",
          }),
          majorNo: Joi.number().required().messages({
            "number.base": "majorNo은 숫자 형식입니다.",
            "number.integer": "majorNo은 정수입니다.",
            "any.required": "majorNo 필드가 비었습니다.",
          }),
          detailCategoryNo: Joi.number().required().messages({
            "number.base": "detailCategoryNo은 숫자 형식입니다.",
            "number.integer": "detailCategoryNo은 정수입니다.",
            "any.required": "detailCategoryNo 필드가 비었습니다.",
          }),
          title: Joi.string().required().min(1).max(30).messages({
            "string.base": "title은 문자 형식입니다.",
            "string.min": "title은 최소 1글자 입니다..",
            "string.max": "title은 최대 20글자 입니다.",
            "any.required": "title 필드가 비었습니다.",
          }),
          price: Joi.number().required().min(0).max(4200000000).messages({
            "number.base": "price은 숫자 형식입니다.",
            "number.integer": "price은 정수입니다.",
            "number.min": "price은 0 이상 입니다.",
            "number.max": "price은 42억 이하입니다.",
            "any.required": "price 필드가 비었습니다.",
          }),
          description: Joi.string().required().max(21844).messages({
            "string.base": "description은 문자 형식입니다.",
            "string.max": "description은 최대 21844글자 입니다.",
            "any.required": "description 필드가 비었습니다.",
          }),
          thumbnail: Joi.string().required().max(255).messages({
            "string.base": "thumbnail은 문자 형식입니다.",
            "string.max": "thumbnail은 최대 255글자 입니다.",
            "any.required": "thumbnail 필드가 비었습니다.",
          }),
          isBargaining: Joi.boolean().required().messages({
            "boolean.base": "isBargaining은 불리언 형식입니다.",
            "any.required": "isBargaining 필드가 비었습니다.",
          }),
          damageStatusNo: Joi.number().required().messages({
            "number.base": "damageStatusNo은 숫자 형식입니다.",
            "number.integer": "damageStatusNo은 정수입니다.",
            "any.required": "damageStatusNo 필드가 비었습니다.",
          }),
          tradingMethods: Joi.object()
            .required()
            .messages({
              "object.base": "tradingMethods는 Object 형식입니다.",
              "any.required": "tradingMethods 필드가 비었습니다.",
            })
            .keys({
              isDirect: Joi.boolean().required().messages({
                "boolean.base": "isDirect은 불리언 형식입니다.",
                "any.required": "isDirect 필드가 비었습니다.",
              }),
              isDelivery: Joi.boolean().required().messages({
                "boolean.base": "isDelivery은 불리언 형식입니다.",
                "any.required": "isDelivery 필드가 비었습니다.",
              }),
            }),
          images: Joi.array().items(Joi.string()).messages({
            "string.base": "images 배열의 원소는 문자로 구성됩니다.",
          }),
        }),
    }),
    productNo: Joi.object().keys({
      product: Joi.object()
        .required()
        .messages({
          "object.base": "product는 Object 형식입니다.",
          "any.required": "product 필드가 비었습니다.",
        })
        .keys({
          title: Joi.string().required().min(1).max(30).messages({
            "string.base": "title은 문자 형식입니다.",
            "string.min": "title은 최소 1글자 입니다..",
            "string.max": "title은 최대 20글자 입니다.",
            "any.required": "title 필드가 비었습니다.",
          }),
          price: Joi.number().required().min(0).max(4200000000).messages({
            "number.base": "price은 숫자 형식입니다.",
            "number.integer": "price은 정수입니다.",
            "number.min": "price은 0 이상 입니다.",
            "number.max": "price은 42억 이하입니다.",
            "any.required": "price 필드가 비었습니다.",
          }),
          description: Joi.string().required().max(21844).messages({
            "string.base": "description은 문자 형식입니다.",
            "string.max": "description은 최대 21844글자 입니다.",
            "any.required": "description 필드가 비었습니다.",
          }),
          thumbnail: Joi.string().required().max(255).messages({
            "string.base": "thumbnail은 문자 형식입니다.",
            "string.max": "thumbnail은 최대 255글자 입니다.",
            "any.required": "thumbnail 필드가 비었습니다.",
          }),
          isBargaining: Joi.boolean().required().messages({
            "boolean.base": "isBargaining은 불리언 형식입니다.",
            "any.required": "isBargaining 필드가 비었습니다.",
          }),
          damageStatusNo: Joi.number().required().messages({
            "number.base": "damageStatusNo은 숫자 형식입니다.",
            "number.integer": "damageStatusNo은 정수입니다.",
            "any.required": "damageStatusNo 필드가 비었습니다.",
          }),
          tradingMethods: Joi.object()
            .required()
            .messages({
              "object.base": "tradingMethods는 Object 형식입니다.",
              "any.required": "tradingMethods 필드가 비었습니다.",
            })
            .keys({
              isDirect: Joi.boolean().required().messages({
                "boolean.base": "isDirect은 불리언 형식입니다.",
                "any.required": "isDirect 필드가 비었습니다.",
              }),
              isDelivery: Joi.boolean().required().messages({
                "boolean.base": "isDelivery은 불리언 형식입니다.",
                "any.required": "isDelivery 필드가 비었습니다.",
              }),
            }),
          images: Joi.array().items(Joi.string()).messages({
            "string.base": "images 배열의 원소는 문자로 구성됩니다.",
          }),
        }),
    }),
  },
};

const communities = {
  query: {
    root: Joi.object().keys({
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
  },
  params: {
    detail: Joi.object().keys({
      communityNo: Joi.number().required().messages({
        "number.base": "communityNo은 숫자 형식입니다.",
        "number.integer": "communityNo은 정수입니다.",
        "any.required": "communityNo 필드가 비었습니다.",
      }),
      userNo: Joi.number().required().messages({
        "number.base": "userNo 은 숫자 형식입니다.",
        "number.integer": "userNo 은 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
    }),
    communityNo: Joi.object().keys({
      communityNo: Joi.number().required().messages({
        "number.base": "communityNo은 숫자 형식입니다.",
        "number.integer": "communityNo은 정수입니다.",
        "any.required": "communityNo 필드가 비었습니다.",
      }),
    }),
  },
  body: {
    likeCnt: Joi.object().keys({
      flag: Joi.number().min(0).max(1).required().messages({
        "number.base": "flag 은 숫자 형식입니다.",
        "number.min": "flag 는 0 이상 1이하입니다.",
        "number.max": "flag 는 0 이상 1이하입니다.",
        "number.integer": "flag 은 정수입니다.",
        "any.required": "flag 필드가 비었습니다.",
      }),
      userNo: Joi.number().required().messages({
        "number.base": "flag 은 숫자 형식입니다.",
        "number.integer": "flag 은 정수입니다.",
        "any.required": "flag 필드가 비었습니다.",
      }),
    }),
    root: Joi.object().keys({
      community: Joi.object()
        .required()
        .messages({
          "object.base": "community는 Object 형식입니다.",
          "any.required": "community 필드가 비었습니다.",
        })
        .keys({
          userNo: Joi.number().required().messages({
            "number.base": "userNo은 숫자 형식입니다.",
            "number.integer": "userNo은 정수입니다.",
            "any.required": "userNo 필드가 비었습니다.",
          }),
          regionNo: Joi.number().required().messages({
            "number.base": "regionNo은 숫자 형식입니다.",
            "number.integer": "regionNo은 정수입니다.",
            "any.required": "regionNo 필드가 비었습니다.",
          }),
          schoolNo: Joi.number().required().messages({
            "number.base": "schoolNo은 숫자 형식입니다.",
            "number.integer": "schoolNo은 정수입니다.",
            "any.required": "schoolNo 필드가 비었습니다.",
          }),
          departmentNo: Joi.number().required().messages({
            "number.base": "departmentNo은 숫자 형식입니다.",
            "number.integer": "departmentNo은 정수입니다.",
            "any.required": "departmentNo 필드가 비었습니다.",
          }),
          majorNo: Joi.number().required().messages({
            "number.base": "majorNo은 숫자 형식입니다.",
            "number.integer": "majorNo은 정수입니다.",
            "any.required": "majorNo 필드가 비었습니다.",
          }),
          detailCategoryNo: Joi.number().required().messages({
            "number.base": "detailCategoryNo은 숫자 형식입니다.",
            "number.integer": "detailCategoryNo은 정수입니다.",
            "any.required": "detailCategoryNo 필드가 비었습니다.",
          }),
          title: Joi.string().required().min(1).max(30).messages({
            "string.base": "title은 문자 형식입니다.",
            "string.min": "title은 최소 1글자 입니다..",
            "string.max": "title은 최대 20글자 입니다.",
            "any.required": "title 필드가 비었습니다.",
          }),
          description: Joi.string().required().max(21844).messages({
            "string.base": "description은 문자 형식입니다.",
            "string.max": "description은 최대 21844글자 입니다.",
            "any.required": "description 필드가 비었습니다.",
          }),
          thumbnail: Joi.string().messages({
            "string.base": "thumbnail은 문자 형식입니다.",
          }),
        }),
    }),
    communityNo: Joi.object().keys({
      community: Joi.object()
        .required()
        .messages({
          "object.base": "community는 Object 형식입니다.",
          "any.required": "community 필드가 비었습니다.",
        })
        .keys({
          title: Joi.string().required().min(1).max(30).messages({
            "string.base": "title은 문자 형식입니다.",
            "string.min": "title은 최소 1글자 입니다..",
            "string.max": "title은 최대 20글자 입니다.",
            "any.required": "title 필드가 비었습니다.",
          }),
          description: Joi.string().required().max(21844).messages({
            "string.base": "description은 문자 형식입니다.",
            "string.max": "description은 최대 21844글자 입니다.",
            "any.required": "description 필드가 비었습니다.",
          }),
          thumbnail: Joi.string().required().messages({
            "string.base": "thumbnail은 문자 형식입니다.",
            "any.required": "thumbnail 필드가 비었습니다.",
          }),
          images: Joi.array().items(Joi.string()).messages({
            "string.base": "images 배열의 원소는 문자로 구성됩니다.",
          }),
        }),
    }),
  },
};

const watchlist = {
  body: Joi.object().keys({
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

const buylist = {
  params: Joi.object().keys({
    userNo: Joi.number().required().messages({
      "number.base": "userNo 는 숫자 형식입니다.",
      "number.integer": "userNo 는 정수입니다.",
      "any.required": "userNo 필드가 비었습니다.",
    }),
  }),
};

const selllist = {
  params: Joi.object().keys({
    userNo: Joi.string().required().messages({
      "any.required": "userNo 필드가 비었습니다.",
    }),
  }),
};

const findPassword = {
  POST_schema: Joi.object().keys({
    name: Joi.string().required().messages({
      "string.base": "name은 문자 형식입니다.",
      "any.required": "name 필드가 비었습니다.",
    }),
    email: Joi.string().required().email().messages({
      "string.base": "email 은 문자 형식입니다.",
      "string.empty": "email 값을 입력해주세요.",
      "string.pattern.base": "email 형식이 틀렸습니다.",
      "any.required": "email 필드가 비었습니다.",
    }),
  }),
};

const changePassword = {
  POST_schema: Joi.object().keys({
    currentPassword: Joi.string().required().messages({
      "string.base": "currentPassword 은 문자 형식입니다.",
      "any.required": "currentPassword 필드가 비었습니다.",
    }),
    changePassword: Joi.string().required().messages({
      "string.base": "changePassword 은 문자 형식입니다.",
      "any.required": "changePassword 필드가 비었습니다.",
    }),
    userNo: Joi.number().required().messages({
      "number.base": "userNo 는 숫자 형식입니다.",
      "number.integer": "userNo 는 정수입니다.",
      "any.required": "userNo 필드가 비었습니다.",
    }),
  }),
};

const image = {
  body: Joi.object().keys({
    no: Joi.number().messages({
      "number.base": "no 는 숫자 형식입니다.",
      "number.integer": "no 는 정수입니다.",
    }),
    flag: Joi.number().messages({
      "number.base": "flag 는 숫자 형식입니다.",
      "number.integer": "flag 는 정수입니다.",
    }),
    images: Joi.array().messages({}),
  }),
};

const comment = {
  create: {
    body: Joi.object().keys({
      userNo: Joi.number().required().messages({
        "number.base": "userNo 는 숫자 형식입니다.",
        "number.integer": "userNo 는 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
      description: Joi.string().required().messages({
        "string.base": "description 은 문자 형식입니다.",
        "any.required": "description 필드가 비었습니다.",
      }),
      communityNo: Joi.number().required().messages({
        "number.base": "communityNo 는 숫자 형식입니다.",
        "number.integer": "communityNo 는 정수입니다.",
        "any.required": "communityNo 필드가 비었습니다.",
      }),
    }),
  },

  updateLikeCnt: {
    params: Joi.object().keys({
      commentNo: Joi.number().required().messages({
        "number.base": "commentNo 는 숫자 형식입니다.",
        "number.integer": "commentNo 는 정수입니다.",
        "any.required": "commentNo 필드가 비었습니다.",
      }),
    }),
    body: Joi.object().keys({
      flag: Joi.number().min(0).max(1).required().messages({
        "number.base": "flag 는 숫자 형식입니다.",
        "number.integer": "flag 는 정수입니다.",
        "number.min": "flag 는 0 혹은 1이여야합니다.",
        "number.max": "flag 는 0 혹은 1이여야합니다.",
        "any.required": "flag 필드가 비었습니다.",
      }),
      userNo: Joi.number().required().messages({
        "number.base": "userNo 는 숫자 형식입니다.",
        "number.integer": "userNo 는 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
    }),
  },

  updateContent: {
    params: Joi.object().keys({
      commentNo: Joi.number().required().messages({
        "number.base": "commentNo 는 숫자 형식입니다.",
        "number.integer": "commentNo 는 정수입니다.",
        "any.required": "commentNo 필드가 비었습니다.",
      }),
    }),
    body: Joi.object().keys({
      description: Joi.string().required().messages({
        "string.base": "description 은 문자 형식입니다.",
        "any.required": "description 필드가 비었습니다.",
      }),
    }),
  },

  delete: {
    params: Joi.object().keys({
      commentNo: Joi.number().required().messages({
        "number.base": "commentNo 는 숫자 형식입니다.",
        "number.integer": "commentNo 는 정수입니다.",
        "any.required": "commentNo 필드가 비었습니다.",
      }),
    }),
  },
};

const reply = {
  find: {
    params: Joi.object().keys({
      commentNo: Joi.number().required().messages({
        "number.base": "commmentNo 는 숫자 형식입니다.",
        "number.integer": "commmentNo 는 정수입니다.",
        "any.required": "commmentNo 필드가 비었습니다.",
      }),
      userNo: Joi.number().required().messages({
        "number.base": "userNo 는 숫자 형식입니다.",
        "number.integer": "userNo 는 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
    }),
  },

  create: {
    body: Joi.object().keys({
      userNo: Joi.number().required().messages({
        "number.base": "userNo 는 숫자 형식입니다.",
        "number.integer": "userNo 는 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
      description: Joi.string().required().messages({
        "string.base": "description 은 문자 형식입니다.",
        "string.empty": "description 값을 입력해주세요.",
        "any.required": "description 필드가 비었습니다.",
      }),
      commentNo: Joi.number().required().messages({
        "number.base": "commmentNo 는 숫자 형식입니다.",
        "number.integer": "commmentNo 는 정수입니다.",
        "any.required": "commmentNo 필드가 비었습니다.",
      }),
    }),
  },

  updateLikeCnt: {
    params: Joi.object().keys({
      replyNo: Joi.number().required().messages({
        "number.base": "replyNo 는 숫자 형식입니다.",
        "number.integer": "replyNo 는 정수입니다.",
        "any.required": "replyNo 필드가 비었습니다.",
      }),
    }),
    body: Joi.object().keys({
      flag: Joi.number().min(0).max(1).required().messages({
        "number.base": "flag 는 숫자 형식입니다.",
        "number.integer": "flag 는 정수입니다.",
        "number.min": "flag 는 0 혹은 1이여야합니다.",
        "number.max": "flag 는 0 혹은 1이여야합니다.",
        "any.required": "flag 필드가 비었습니다.",
      }),
      userNo: Joi.number().required().messages({
        "number.base": "userNo 는 숫자 형식입니다.",
        "number.integer": "userNo 는 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
    }),
  },

  updateContent: {
    params: Joi.object().keys({
      replyNo: Joi.number().required().messages({
        "number.base": "replyNo 는 숫자 형식입니다.",
        "number.integer": "replyNo 는 정수입니다.",
        "any.required": "replyNo 필드가 비었습니다.",
      }),
    }),
    body: Joi.object().keys({
      description: Joi.string().required().messages({
        "string.base": "description 은 문자 형식입니다.",
        "any.required": "description 필드가 비었습니다.",
      }),
    }),
  },

  delete: {
    params: Joi.object().keys({
      replyNo: Joi.number().required().messages({
        "number.base": "replyNo 는 숫자 형식입니다.",
        "number.integer": "replyNo 는 정수입니다.",
        "any.required": "replyNo 필드가 비었습니다.",
      }),
    }),
    body: Joi.object().keys({
      commentNo: Joi.number().required().messages({
        "number.base": "commentNo 는 숫자 형식입니다.",
        "number.integer": "commentNo 는 정수입니다.",
        "any.required": "commentNo 필드가 비었습니다.",
      }),
    }),
  },
};

const bookmark = {
  params: Joi.object().keys({
    userNo: Joi.number().required().messages({
      "number.base": "userNo 는 숫자 형식입니다.",
      "number.integer": "userNo 는 정수입니다.",
      "any.required": "userNo 필드가 비었습니다.",
    }),
  }),
  body: Joi.object().keys({
    communityNo: Joi.number().required().messages({
      "number.base": "communityNo 는 숫자 형식입니다.",
      "number.integer": "communityNo 는 정수입니다.",
      "any.required": "communityNo 필드가 비었습니다.",
    }),
  }),
};

const chat = {
  body: Joi.object().keys({
    sellerNo: Joi.number().required().messages({
      "number.base": "sellerNo 는 숫자 형식입니다.",
      "number.integer": "sellerNo 는 정수입니다.",
      "any.required": "sellerNo 필드가 비었습니다.",
    }),
    buyerNo: Joi.number().required().messages({
      "number.base": "buyerNo 는 숫자 형식입니다.",
      "number.integer": "buyerNo 는 정수입니다.",
      "any.required": "buyerNo 필드가 비었습니다.",
    }),
    productNo: Joi.number().required().messages({
      "number.base": "productNo 는 숫자 형식입니다.",
      "number.integer": "productNo 는 정수입니다.",
      "any.required": "productNo 필드가 비었습니다.",
    }),
  }),
  params: Joi.object().keys({
    userNo: Joi.number().required().messages({
      "number.base": "userNo 는 숫자 형식입니다.",
      "number.integer": "userNo 는 정수입니다.",
      "any.required": "userNo 필드가 비었습니다.",
    }),
  }),
};

const advertisement = {
  body: {
    inquiry: {
      save: Joi.object().keys({
        regionNo: Joi.number().required().messages({
          "number.base": "regionNo은 숫자 형식입니다.",
          "number.integer": "regionNo은 정수입니다.",
          "any.required": "regionNo 필드가 비었습니다.",
        }),
        schoolNo: Joi.number().required().messages({
          "number.base": "schoolNo은 숫자 형식입니다.",
          "number.integer": "schoolNo은 정수입니다.",
          "any.required": "schoolNo 필드가 비었습니다.",
        }),
        departmentNo: Joi.number().required().messages({
          "number.base": "departmentNo은 숫자 형식입니다.",
          "number.integer": "departmentNo은 정수입니다.",
          "any.required": "departmentNo 필드가 비었습니다.",
        }),
        majorNo: Joi.number().required().messages({
          "number.base": "majorNo은 숫자 형식입니다.",
          "number.integer": "majorNo은 정수입니다.",
          "any.required": "majorNo 필드가 비었습니다.",
        }),
        userNo: Joi.number().required().messages({
          "number.base": "userNo은 숫자 형식입니다.",
          "number.integer": "userNo은 정수입니다.",
          "any.required": "userNo 필드가 비었습니다.",
        }),
        title: Joi.string().required().min(1).max(30).messages({
          "string.base": "title은 문자 형식입니다.",
          "string.min": "title은 최소 1글자 입니다..",
          "string.max": "title은 최대 30글자 입니다.",
          "any.required": "title 필드가 비었습니다.",
        }),
        content: Joi.string().required().min(1).max(255).messages({
          "string.base": "content은 문자 형식입니다.",
          "string.min": "content은 최소 1글자 입니다..",
          "string.max": "content은 최대 255글자 입니다.",
          "any.required": "content 필드가 비었습니다.",
        }),
        organizationName: Joi.string().required().min(1).max(30).messages({
          "string.base": "organizationName은 문자 형식입니다.",
          "string.min": "organizationName은 최소 1글자 입니다..",
          "string.max": "organizationName은 최대 30글자 입니다.",
          "any.required": "organizationName 필드가 비었습니다.",
        }),
        inquirer: Joi.string().required().min(1).max(20).messages({
          "string.base": "inquirer은 문자 형식입니다.",
          "string.min": "inquirer은 최소 1글자 입니다..",
          "string.max": "inquirer은 최대 20글자 입니다.",
          "any.required": "inquirer 필드가 비었습니다.",
        }),
        position: Joi.string().required().min(1).max(20).messages({
          "string.base": "position은 문자 형식입니다.",
          "string.min": "position은 최소 1글자 입니다..",
          "string.max": "position은 최대 20글자 입니다.",
          "any.required": "position 필드가 비었습니다.",
        }),
        phoneNumber: Joi.string().required().min(1).max(15).messages({
          "string.base": "phoneNumber은 문자 형식입니다.",
          "string.min": "phoneNumber은 최소 1글자 입니다..",
          "string.max": "phoneNumber은 최대 15글자 입니다.",
          "any.required": "phoneNumber 필드가 비었습니다.",
        }),
        email: Joi.string().max(30).messages({
          "string.base": "email은 문자 형식입니다.",
          "string.max": "email은 최대 30글자 입니다.",
        }),
        homepageUrl: Joi.string().max(255).messages({
          "string.base": "homepageUrl은 문자 형식입니다.",
          "string.max": "homepageUrl은 최대 255글자 입니다.",
        }),
        bannerUrl: Joi.string().max(255).messages({
          "string.base": "bannerUrl은 문자 형식입니다.",
          "string.max": "bannerUrl은 최대 255글자 입니다.",
        }),
        advertisementMonth: Joi.number().required().messages({
          "number.base": "advertisementMonth은 숫자 형식입니다.",
          "number.integer": "advertisementMonth은 정수입니다.",
          "any.required": "advertisementMonth 필드가 비었습니다.",
        }),
        advertisementPrice: Joi.number().required().messages({
          "number.base": "advertisementPrice은 숫자 형식입니다.",
          "number.integer": "advertisementPrice은 정수입니다.",
          "any.required": "advertisementPrice 필드가 비었습니다.",
        }),
      }),

      update: Joi.object().keys({
        regionNo: Joi.number().required().messages({
          "number.base": "regionNo은 숫자 형식입니다.",
          "number.integer": "regionNo은 정수입니다.",
          "any.required": "regionNo 필드가 비었습니다.",
        }),
        schoolNo: Joi.number().required().messages({
          "number.base": "schoolNo은 숫자 형식입니다.",
          "number.integer": "schoolNo은 정수입니다.",
          "any.required": "schoolNo 필드가 비었습니다.",
        }),
        departmentNo: Joi.number().required().messages({
          "number.base": "departmentNo은 숫자 형식입니다.",
          "number.integer": "departmentNo은 정수입니다.",
          "any.required": "departmentNo 필드가 비었습니다.",
        }),
        majorNo: Joi.number().required().messages({
          "number.base": "majorNo은 숫자 형식입니다.",
          "number.integer": "majorNo은 정수입니다.",
          "any.required": "majorNo 필드가 비었습니다.",
        }),
        userNo: Joi.number().required().messages({
          "number.base": "userNo은 숫자 형식입니다.",
          "number.integer": "userNo은 정수입니다.",
          "any.required": "userNo 필드가 비었습니다.",
        }),
        title: Joi.string().required().min(1).max(30).messages({
          "string.base": "title은 문자 형식입니다.",
          "string.min": "title은 최소 1글자 입니다..",
          "string.max": "title은 최대 30글자 입니다.",
          "any.required": "title 필드가 비었습니다.",
        }),
        content: Joi.string().required().min(1).max(255).messages({
          "string.base": "content은 문자 형식입니다.",
          "string.min": "content은 최소 1글자 입니다..",
          "string.max": "content은 최대 255글자 입니다.",
          "any.required": "content 필드가 비었습니다.",
        }),
        organizationName: Joi.string().required().min(1).max(30).messages({
          "string.base": "organizationName은 문자 형식입니다.",
          "string.min": "organizationName은 최소 1글자 입니다..",
          "string.max": "organizationName은 최대 30글자 입니다.",
          "any.required": "organizationName 필드가 비었습니다.",
        }),
        inquirer: Joi.string().required().min(1).max(20).messages({
          "string.base": "inquirer은 문자 형식입니다.",
          "string.min": "inquirer은 최소 1글자 입니다..",
          "string.max": "inquirer은 최대 20글자 입니다.",
          "any.required": "inquirer 필드가 비었습니다.",
        }),
        position: Joi.string().required().min(1).max(20).messages({
          "string.base": "position은 문자 형식입니다.",
          "string.min": "position은 최소 1글자 입니다..",
          "string.max": "position은 최대 20글자 입니다.",
          "any.required": "position 필드가 비었습니다.",
        }),
        phoneNumber: Joi.string().required().min(1).max(15).messages({
          "string.base": "phoneNumber은 문자 형식입니다.",
          "string.min": "phoneNumber은 최소 1글자 입니다..",
          "string.max": "phoneNumber은 최대 15글자 입니다.",
          "any.required": "phoneNumber 필드가 비었습니다.",
        }),
        email: Joi.string().max(30).messages({
          "string.base": "email은 문자 형식입니다.",
          "string.max": "email은 최대 30글자 입니다.",
        }),
        homepageUrl: Joi.string().max(255).messages({
          "string.base": "homepageUrl은 문자 형식입니다.",
          "string.max": "homepageUrl은 최대 255글자 입니다.",
        }),
        bannerUrl: Joi.string().max(255).messages({
          "string.base": "bannerUrl은 문자 형식입니다.",
          "string.max": "bannerUrl은 최대 255글자 입니다.",
        }),
        advertisementMonth: Joi.number().required().messages({
          "number.base": "advertisementMonth은 숫자 형식입니다.",
          "number.integer": "advertisementMonth은 정수입니다.",
          "any.required": "advertisementMonth 필드가 비었습니다.",
        }),
        advertisementPrice: Joi.number().required().messages({
          "number.base": "advertisementPrice은 숫자 형식입니다.",
          "number.integer": "advertisementPrice은 정수입니다.",
          "any.required": "advertisementPrice 필드가 비었습니다.",
        }),
      }),
    },
  },
  params: {
    delete: Joi.object().keys({
      inquiryNo: Joi.number().required().messages({
        "number.base": "inquiryNo은 숫자 형식입니다.",
        "number.integer": "inquiryNo은 정수입니다.",
        "any.required": "inquiryNo 필드가 비었습니다.",
      }),
    }),
    put: Joi.object().keys({
      inquiryNo: Joi.number().required().messages({
        "number.base": "inquiryNo은 숫자 형식입니다.",
        "number.integer": "inquiryNo은 정수입니다.",
        "any.required": "inquiryNo 필드가 비었습니다.",
      }),
    }),
    get: Joi.object().keys({
      userNo: Joi.number().required().messages({
        "number.base": "userNo은 숫자 형식입니다.",
        "number.integer": "userNo은 정수입니다.",
        "any.required": "userNo 필드가 비었습니다.",
      }),
    }),
  },
};

const search = {
  category: {
    query: Joi.object().keys({
      query: Joi.string().required().messages({
        "string.base": "query 은 문자 형식입니다.",
        "string.empty": "query 값을 입력해주세요.",
        "any.required": "query 필드가 비었습니다.",
      }),
    }),
  },
};

module.exports = {
  major,
  user,
  login_POST_schema,
  signup_POST_schema,
  home,
  products,
  communities,
  watchlist,
  buylist,
  selllist,
  findPassword,
  changePassword,
  image,
  comment,
  reply,
  bookmark,
  chat,
  advertisement,
  search,
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
