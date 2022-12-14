const express = require('express');
const router = express.Router();

const ctrl = require('./ctrl');

//각종 테스트를 진행
router.post("/test", (req, res) => {
    const request = req.body;
    res.redirect('/')
})

//가장 처음 들어오는 메인 화면
router.get("/", ctrl.processing.main);

//로그인 후 메인 화면으로 이동
router.get("/login", ctrl.processing.loginmain);

//로그인
router.post("/login", ctrl.processing.login);

//회원가입
router.post("/signup", ctrl.processing.signup);

//refresh token을 사용해서 access token을 발급
router.post("/refresh", ctrl.token.refresh);

//access 유효성 검사
router.get("/user", ctrl.authenticateAccessToken, ctrl.token.authenticate);

//상의 정보 받아오기
router.get("/view/:type", ctrl.processing.view);

//상의 이미지 받아오기
// router.get("/image/:type", ctrl.processing.image);

//아이디 중복 확인
router.get("/identify/:id", ctrl.processing.identify);
module.exports = router;