function errorMiddleware(err, req, res) {
  if (err.message === "Not Exist School")
    return res.status(400).json({ msg: "학교가 존재하지 않습니다." });
  if (err.message === "Not Exist Department")
    return res.status(400).json({ msg: "계열이 존재하지 않습니다." });
  // if (err.message === "Not Exist School By region")
  //   return res
  //     .status(400)
  //     .json({ msg: "지역에 맞는 학교가 존재하지 않습니다." });

  if (err.message === "Not Exist Major")
    return res.status(400).json({ msg: "전공이 존재하지 않습니다." });
  if (err.message === "Not Exist Hot And New")
    return res
      .status(400)
      .json({ msg: "today 장터 내역이 존재하지 않습니다." });
  if (err.message === "Duplicate Email")
    return res.status(401).json({ msg: "이메일이 중복되었습니다." });
  if (err.message === "Duplicate nickname")
    return res.status(401).json({ msg: "닉네임이 중복되었습니다." });
  if (err.message === "wrong password")
    return res.status(400).json({ msg: "비밀번호가 틀립니다." });
  if (err.message === "Not Exist email")
    return res.status(400).json({ msg: "이메일이 존재하지 않습니다." });

  return res.status(500).json({ err });
}

module.exports = errorMiddleware;
