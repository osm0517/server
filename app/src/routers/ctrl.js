const mysql = require('mysql');
const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'kt1079616',
    database: 'test220901'
};

const crypto = require('./crypto');

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();

const process = {
    login : (req, res) => {
        const request = req.body;
        let sql = `select * from member where id = ${request.id}`
        connection.query(sql, async (err, results, fields) => {
            let answer = {};
            if(err) {
                answer.success = false;
                answer.msg = "일치하는 아이디가 없습니다.";
                console.log(err);
            }else{
                const pwd = results[0].pwd;
                const {hashPwd} = await crypto.encryption.loginIncode(request.pwd, results[0].salt);
                console.log(results);
                if(pwd === hashPwd){
                    answer.success = true;
                    console.log("success");
                }else{
                    answer.success = false;
                    answer.msg = "비밀번호를 확인해주세요.";
                    console.log("pwd error");
                }
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
            res.send(err);
        });
        // console.log(req.body);
    }
}

module.exports = {
    process,

}