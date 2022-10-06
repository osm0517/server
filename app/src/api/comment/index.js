const router = require('express').Router();
const ctrl = require('./ctrl');

//댓글 달기
router.post("/write", ctrl.process.write);

//댓글 지우기
router.delete("/delete", ctrl.process.delete);

//대댓글 달기
router.post("/write/nested", ctrl.process.nested);

//댓글 신고하기
router.post("/report", ctrl.process.report);

module.exports = router;