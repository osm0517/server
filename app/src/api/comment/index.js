const router = require('express').Router();
const ctrl = require('./ctrl');

//로그인
router.post("/login", ctrl.processing.login);

//회원가입
router.post("/signup", ctrl.processing.signup);

//계정 삭제
router.delete("/delete", ctrl.processing.delete);

//정보 변경
router.post("/change/:type", ctrl.processing.change);

//비밀번호 찾기
router.get("/search/password", ctrl.processing.search);

module.exports = router;