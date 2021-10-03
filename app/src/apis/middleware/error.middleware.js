function errorMiddleware(err, req, res) {
  if (err.message === "Not Exist School")
    return res.status(400).json({ msg: "학교가 존재하지 않습니다." });
  if (err.message === "Not Exist Department")
    return res.status(400).json({ msg: "계열이 존재하지 않습니다." });
  // if (err.message === "Not Exist School By region")
  //   return res
  //     .status(400)
  //     .json({ msg: "지역에 맞는 학교가 존재하지 않습니다." });
}

module.exports = errorMiddleware;
