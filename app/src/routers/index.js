const express = require('express');
const router = express.Router();

const ctrl = require('./ctrl');

router.post("/login", ctrl.process.login);

router.post("/signup", ctrl.process.signup);


module.exports = router;