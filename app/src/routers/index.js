const express = require('express');
const router = express.Router();


const ctrl = require('./ctrl');
router.get("/", (req, res) => {
    
    
    res.render('test');
    
});

router.post("/", (req, res) => {
    // req.session.user = {
    //     id : "wpqkf",
    //     pwd : "w[qlfw[qkjf"
    // };
    // req.session.save((err) => {
    //     if(err) throw err;
    //     console.log("successed")
    //     const SID = req.sessionID
    //     console.log("SID => " + SID)
    //     res.writeHead('Set-Cookie', `connect.id=${SID}; path=/`);
    //     console.log("두구두구")
    //     console.log(req.cookies)
    // })
    console.log("enrnenr");
    res.setHeader("Set-Cookie", "test=wpqkf")
    
});

router.get("/test", (req, res) => {
    res.send("dd")
});

router.post("/login", ctrl.process.login);

router.post("/signup", ctrl.process.signup);

router.get("/cookie", ctrl.process.test);

router.post("/cookie", ctrl.process.cookie);
module.exports = router;