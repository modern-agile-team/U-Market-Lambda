// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
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
  if (err.message === "Not Exist Email")
    return res.status(404).json({ error: "이메일이 존재하지 않습니다." });
  if (err.message === "Not Exist User")
    return res.status(404).json({ error: "사용자가 존재하지 않습니다." });
  if (err.message === "no data in the database")
    return res.status(401).json({ msg: "데이터가 저장되어 있지 않습니다." });
  if (err.message === "Already Exist Watchlist")
    return res.status(400).json({ msg: "이미 관심목록에 저장되어 있습니다." });
  if (err.message === "Not Exist Product")
    return res.status(400).json({ msg: "존재하지 않는 제품입니다." });
  if (err.message === "Not Exist Community")
    return res.status(400).json({ msg: "존재하지 않는 커뮤니티 글입니다." });
  if (err.message === "Do not match name and email")
    return res.status(400).json({ msg: "이름과 이메일이 맞지 않습니다." });
  if (err.message === "Not Exist User")
    return res.status(400).json({ msg: "사용자가 존재하지 않습니다." });
  if (err.message === "Wrong Password")
    return res.status(400).json({ msg: "현재 비밀번호와 맞지 않습니다." });
  if (err.message === "Not Exist ImageUrl")
    return res.status(400).json({ msg: "image의 주소가 넘어오지 않았습니다." });
  if (err.message === "Create Fail Comment")
    return res.status(400).json({ msg: "댓글이 생성되지 않았습니다." });
  if (err.message === "Not Exist Comment")
    return res.status(400).json({ msg: "댓글이 존재하지 않습니다." });
  if (err.message === "Not Delete Comment")
    return res.status(400).json({ msg: "댓글이 삭제되지 않았습니다." });
  if (err.message === "Not Update Comment")
    return res.status(400).json({ msg: "댓글이 업데이트되지 않았습니다." });
  if (err.message === "LikeCount is not minus")
    return res.status(400).json({ msg: "좋아요 수가 이미 0입니다." });
  if (err.message === "Already Exist Bookmark")
    return res.status(400).json({ msg: "북마크에 이미 저장되었습니다." });

  return res.status(500).json({ error: err.message });
}

module.exports = errorMiddleware;
