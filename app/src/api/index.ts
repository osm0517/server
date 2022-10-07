const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/view', require('./view'));
router.use('/like', require('./like'));
router.use('/comment', require('./comment'));

module.exports = router;