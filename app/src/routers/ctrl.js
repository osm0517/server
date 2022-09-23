const mysql = require('mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'test220901'
};
// jwt accesstoken만드는 함수 15분 유지
const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.JWT_ACCESS_SCREAT_KEY, {
        expiresIn:"15m"
    });
};
// jwt refreshtoken만드는 함수 180일 유지
const generateRefreshToken = (id) => {
    return jwt.sign({id}, process.env.JWT_REFRESH_SCREAT_KET, {
        expiresIn: "180 days",
    });
};
// access token의 유효성 검사
const authenticateAccessToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("wrong token format or token is not sended");
        return res.sendStatus(400);
    }

    jwt.verify(token, process.env.JWT_ACCESS_SCREAT_KEY, (error, user) => {
        if (error) {
            console.log(error);
            return res.sendStatus(403);
        }
        
        req.user = user;
        next();
    });
};


const crypto = require('./crypto');

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();

const processing = {
    login : (req, res) => {
        const request = req.body;
        let sql = `select * from member where id = '${request.id}'`
        connection.query(sql, async (err, results, fields) => {
            let answer = {};
            if(err) {
                answer.success = false;
                answer.msg = "일치하는 아이디가 없습니다.";
                console.log(err);
            }else{
                const pwd = results[0].pwd;
                const {hashPwd} = await crypto.encryption.loginIncode(request.pwd, results[0].salt);
                
                if(pwd === hashPwd){
                    answer.success = true;
                    console.log("success");
                    req.session.user = {
                        id : request.id,
                    };
                    req.session.save((err) => {
                        if(err) throw err;
                        console.log("successed")
                        const SID = req.sessionID
                        console.log("SID => " + SID)
                        res.setHeader('Set-Cookie', `connect.id=${SID}; path=/`);
                        
                        console.log("cookies => " + req.cookies)
                    })
                    answer.accessToken = generateAccessToken(request.id);
                    answer.refreshToken = generateRefreshToken(request.id);
                }else{
                    answer.success = false;
                    answer.msg = "비밀번호를 확인해주세요.";
                    console.log("pwd error");
                }
                console.log(answer);
            }
        });
        
    },

    signup : async (req, res) => {
        const request = req.body;
        const {pwd, salt} = await crypto.encryption.incode(request.pwd);
        let sql = `insert into member (id, pwd, salt) values ('${request.id}', '${pwd}', '${salt}')`
        connection.query(sql, (err, results, fields) => {
            let answer = {};
            if (err) {
                answer.success = false;
                answer.msg = err;
                console.log(err);
            }else{
                answer.success = true;
                answer.msg = results;
                console.log(results);
            }
            res.send(answer);
        });
    },

    main : (req, res) => {
        res.send("test")
    },
    loginmain : (req, res) => {
        res.send("loginmain");
    }
}
const token = {
    refresh : (req, res) => {
        let refreshToken = req.body.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
    
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SCREAT_KET,
            (error, user) => {
                if (error) return res.sendStatus(403);
    
                const accessToken = generateAccessToken(user.id);
    
                res.json({ accessToken });
            }
        );
    },

    authenticate : (req, res) => {
        console.log(req.user);
        res.json(users.filter((user) => user.id === req.user.id));
    }
}

module.exports = {
    processing,
    token,
    authenticateAccessToken,

}