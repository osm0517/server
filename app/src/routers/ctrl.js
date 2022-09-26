const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const fs = require('fs');
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
    },
    view : (req, res) => {
        const parameter = req.params;
        const sql = `select * from ${parameter.type}`;
        connection.query(sql, (err, results, fields) => {
            if(err) console.log(err);
            else{
                console.log("success");
                res.send(results);
            }
        })
    },
    //테스트를 위해서 로컬에 있는 파일에 이미지를 불러올 것
    //테스트를 위한 것이기 때문에 이미지를 분류하지 않았음.
    image : (req, res) => {
        const type = req.params.type;
        const imageName = [];
        switch (type) { // switch문을 사용해서 모든 카테고리를 나눌 수 있도록 할 것
            case "top":
                const sql = `select * from ${type}`;
                connection.query(sql, (err, results, fields) => {
                    if(err) console.log("image 요청 중 에러 =>" + err);
                    else{
                        console.log("success");
                        //sql 요청으로 얻은 값 중 아이디만을 추출하여
                        //map 함수를 사용해서 array형식으로 저장
                        results.map(result => imageName.push(result.id))
                        try {
                            //fs를 사용해서 상대경로로 설정시 에러가 발생함
                            imageName.map(image => fs.readFileSync(`/image/${image}.jpeg`),
                            (err, data) => {
                                if(err) console.log(err);
                                else{
                                    console.log("과연")
                                    console.log(data)
                                }
                            })
                        } catch (err) {
                            console.log("fs를 사용 중 에러가 발생 => " + err);
                        }
                        
                    }
                })
                break;
        
            default:
                fs.readFileSync("../public/image/testTop"), (err ,data) => {
                    res.writeHead(200, { "Context-Type": "image/jpg" });//보낼 헤더를 만듬                
                    res.write(data);   //본문을 만들고                
                    res.end();  //클라이언트에게 응답을 전송한다
                }
                break;
        }
    },
    identify : (req, res) => {
        const id = req.params.id;
        const sql = `select count(*) from member where id = '${id}'`;
        connection.query(sql, (err, results, fields) => {
            if(err) {
                console.log("identify err => " + err);
                res.send({
                    success : false,
                    msg : "identify err => " + err
                })
            }else{
                if(results > 0) {
                    console.log(results);
                    res.send({
                        success : false,
                        msg : "중복된 아이디가 발견"
                    })
                }else{
                    console.log("중복된 아이디 미발견");
                    res.send({
                        success : true,
                        msg : "중복된 아이디 미발견"
                    })
                }
            }
        })
        
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