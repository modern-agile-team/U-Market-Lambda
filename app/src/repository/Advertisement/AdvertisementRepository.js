const mysql = require("../../config/mysql");

class AdvertisementRepository {
  static async saveInquiry(inquiry) {
    try {
      await mysql.connect();
      const query = `INSERT INTO advertisement_inquiries (
          region_no, school_no, department_no, major_no,   
          organization_name, inquirer_name, position, phone_number, email,
          homepage_url, banner_url, advertisement_month, advertisement_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      const result = await mysql.query(query, [
        inquiry.regionNo,
        inquiry.schoolNo,
        inquiry.departmentNo,
        inquiry.majorNo,
        inquiry.organizationName,
        inquiry.inquirer,
        inquiry.position,
        inquiry.phoneNumber,
        inquiry.email,
        inquiry.homepageUrl,
        inquiry.bannerUrl,
        inquiry.advertisementMonth,
        inquiry.advertisementPrice,
      ]);
      return result?.insertId;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
  // 문의 삭제 기능 구현중
  // static async deleteInquiry(inquiry) {
  //   try {
  //     await mysql.connect();
  //     const query = `DELETE FROM advertisement_inquiries WHERE no = ?`;
  //     const result = await mysql.query(query, [inquiry.no]);
  //     return result?.insertId;
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     mysql?.end();
  //   }
  // }
}

module.exports = AdvertisementRepository;
