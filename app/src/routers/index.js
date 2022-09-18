const express = require('express');
const router = express.Router();

const ctrl = require('./ctrl');
router.get("/", (req, res) => {
    res.send("dd")
});

router.get("/test", (req, res) => {
    res.send("dd")
});

router.post("/login", ctrl.process.login);

router.post("/signup", ctrl.process.signup);

router.get("/cookie", ctrl.process.test);

router.post("/cookie", ctrl.process.cookie);
module.exports = router;