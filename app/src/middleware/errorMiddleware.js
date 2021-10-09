// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  console.log("에러미들웨어 진입");
  if (err.message === "Not Exist School")
    return res.status(404).json({ error: "학교가 존재하지 않습니다." });
  if (err.message === "Not Exist Department")
    return res.status(404).json({ error: "계열이 존재하지 않습니다." });
  // if (err.message === "Not Exist School By region")
  //   return res
  //     .status(400)
  //     .json({ error: "지역에 맞는 학교가 존재하지 않습니다." });

  if (err.message === "Not Exist Major")
    return res.status(404).json({ error: "전공이 존재하지 않습니다." });
  if (err.message === "Not Exist Hot And New")
    return res
      .status(404)
      .json({ error: "today 장터 내역이 존재하지 않습니다." });
  if (err.message === "Not Exist Referenced Row")
    return res
      .status(404)
      .json({ error: "존재하지 않는 데이터에 접근하셨습니다." });
  if (err.message === "Duplicate Email")
    return res.status(401).json({ error: "이메일이 중복되었습니다." });
  if (err.message === "Duplicate nickname")
    return res.status(401).json({ error: "닉네임이 중복되었습니다." });
  if (err.message === "wrong password")
    return res.status(400).json({ error: "비밀번호가 틀립니다." });
  if (err.message === "Not Exist email")
    return res.status(404).json({ error: "이메일이 존재하지 않습니다." });
  if (err.message === "Not Exist Nickname")
    return res.status(404).json({ error: "닉네임이 존재하지 않습니다." });

  return res.status(500).json({ error: err });
}

module.exports = errorMiddleware;
