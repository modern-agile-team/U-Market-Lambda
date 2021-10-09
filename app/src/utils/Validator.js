class Validator {
  static checkPriceRange(query) {
    if (isNaN(query.startPriceRange) || query.startPriceRange < 0) {
      query.startPriceRange = 0;
    }

    if (isNaN(query.endPriceRange) || query.endPriceRange > 999999999) {
      query.endPriceRange = 999999999;
    }
    return query;
  }

  static makeSqlAboutWhereStatements(query) {
    let sql = "";
    if (!isNaN(query.regionNo)) {
      sql += `AND region_no = ${query.regionNo} `;
    }

    if (!isNaN(query.schoolNo)) {
      sql += `AND school_no = ${query.schoolNo} `;
    }

    if (!isNaN(query.departmentNo)) {
      sql += `AND department_no = ${query.departmentNo} `;
    }

    if (!isNaN(query.majorNo)) {
      sql += `AND major_no = ${query.majorNo} `;
    }
    return sql;
  }

  static makeHashSqlAboutWhereStatements(hashTags) {
    let sql = "";
    if (hashTags.length >= 1) {
      sql += `hs.name = "${hashTags[0]}"`;
    }
    hashTags.slice(1).forEach(hashTag => {
      sql += ` OR hs.name = "${hashTag}"`;
    });
    return sql;
  }
}

module.exports = Validator;
