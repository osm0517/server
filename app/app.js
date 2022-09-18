const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = require('./src/routers');
const crypto = require('./src/routers/crypto');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = process.env.PORT || 5000;

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));
app.use("/", router);
app.use(express.static('./src/public'));
app.use(session({
    secret : 'sungminTest',
    resave : false,
    saveUninitialized : false,
    cookie : {
        secure : false,
        maxAge : 24 * 60 * 60 * 1000,
        path : '/',
        
    }
}))

app.listen(port, async () => {
    console.log(`${port}에서 서버 가동`);
})