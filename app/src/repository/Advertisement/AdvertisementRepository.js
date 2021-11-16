const mysql = require("../../config/mysql");

class AdvertisementRepository {
  static async saveInquiry(inquiry) {
    try {
      await mysql.connect();
      const query = `INSERT INTO advertisement_inquiries (
          region_no, school_no, department_no, major_no, user_no, 
          title, content,
          organization_name, inquirer_name, position, phone_number, email,
          homepage_url, banner_url, advertisement_month, advertisement_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      const result = await mysql.query(query, [
        inquiry.regionNo,
        inquiry.schoolNo,
        inquiry.departmentNo,
        inquiry.majorNo,
        inquiry.userNo,
        inquiry.title,
        inquiry.content,
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

  static async deleteInquiry(inquiryNo) {
    try {
      await mysql.connect();
      const query = `DELETE FROM advertisement_inquiries WHERE no = ?`;
      const result = await mysql.query(query, [inquiryNo]);
      return Boolean(result.affectedRows);
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async updateInquiry(inquiry, inquiryNo) {
    try {
      await mysql.connect();
      const query = `UPDATE advertisement_inquiries 
          SET region_no=?, school_no=?, department_no=?, major_no=?, user_no=?, 
          title=?, content=?,
          organization_name=?, inquirer_name=?, position=?, phone_number=?, email=?,
          homepage_url=?, banner_url=?, advertisement_month=?, advertisement_price=?
          WHERE no=?;`;

      const result = await mysql.query(query, [
        inquiry.regionNo,
        inquiry.schoolNo,
        inquiry.departmentNo,
        inquiry.majorNo,
        inquiry.userNo,
        inquiry.title,
        inquiry.content,
        inquiry.organizationName,
        inquiry.inquirer,
        inquiry.position,
        inquiry.phoneNumber,
        inquiry.email,
        inquiry.homepageUrl,
        inquiry.bannerUrl,
        inquiry.advertisementMonth,
        inquiry.advertisementPrice,
        inquiryNo,
      ]);
      return Boolean(result?.affectedRows);
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }

  static async findAdvertisementByInquirer(inquiryNo) {
    try {
      await mysql.connect();
      const query = `
      SELECT ad_i.no, ad_i.title, 
      ad_i.inquirer_name AS inquirerName, users.name
      FROM advertisement_inquiries AS ad_i
      LEFT JOIN users on ad_i.user_no = users.no
      WHERE ad_i.user_no = ?`;
      const inquiries = await mysql.query(query, [inquiryNo]);
      return inquiries;
    } catch (err) {
      throw err;
    } finally {
      mysql?.end();
    }
  }
}

module.exports = AdvertisementRepository;
