const router = require('express').Router();
const ctrl =  require('./ctrl');

//로그인
router.post("/login", ctrl.process.login);

//회원가입
router.post("/signup", ctrl.process.signup);

//계정 삭제
router.delete("/delete", ctrl.process.delete);

//정보 변경
router.post("/change/:type", ctrl.process.change);

//비밀번호 찾기
router.get("/search/password", ctrl.process.search);

module.exports = router
export {}