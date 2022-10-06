const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const crypto = require('./src/routers/crypto');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');

const options = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'kt1079616',
    database: 'test220901'
};
const sessionStore = new MySQLStore(options);

const port = process.env.PORT || 5000;

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use('/api', require('./src/api'))
app.use(express.static(__dirname + "public"))
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));
app.use(session({
    secret : 'haksdfue',
    resave : false,
    saveUninitialized : false,
    store : sessionStore,
    cookie : {
        secure : false,
        maxAge : 24 * 60 * 60 * 1000,
        path : '/',
    },
    
}))
app.use(cors());
app.use(express.static('./src/public'));


app.listen(port, async () => {
    console.log(`${port}에서 서버 가동`);
})
