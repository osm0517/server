const router = require('express').Router();
const ctrl = require('./ctrl');

//좋아요
router.post("/nice/:type", ctrl.process.nice);

//싫어요
router.post("/hate/:type", ctrl.process.hate);


module.exports = router;
export{}