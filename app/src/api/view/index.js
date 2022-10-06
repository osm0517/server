const router = require('express').Router();
const ctrl = require('./ctrl');

//목록 보기
router.get("/:type", ctrl.process.list);

//상세보기
router.get("/:type/detail", ctrl.process.detail);

module.exports = router;